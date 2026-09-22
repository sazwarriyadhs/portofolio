import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

type OpportunityPayload = {
  inquiryType?: string;
  name?: string;
  email?: string;
  company?: string;
  project?: string;
  message?: string;
  budget?: string;
  timeline?: string;
  reference?: string;
  website?: string;
};

type OpportunityRecord = OpportunityPayload & {
  id: string;
  createdAt: string;
  ip?: string;
  userAgent?: string;
};

const ALLOWED_TYPES = [
  'Project Development',
  'Strategic Partnership',
  'AI Transformation',
  'Consulting',
  'Investment',
  'Other',
];

const ALLOWED_BUDGETS = [
  '< $10K',
  '$10K – $50K',
  '$50K – $250K',
  '$250K+',
  'Not decided yet',
];

const ALLOWED_TIMELINES = [
  'ASAP',
  '1–3 months',
  '3–6 months',
  '6–12 months',
  'Flexible',
];

const MAX_MESSAGE_LENGTH = 5000;

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      ok: false,
      error: message,
    },
    { status },
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clean(value: unknown, max = 500) {
  if (typeof value !== 'string') return '';

  return value
    .trim()
    .replace(/\u0000/g, '')
    .slice(0, max);
}

async function saveLead(record: OpportunityRecord) {
  const dataDir = path.join(process.cwd(), 'data');
  const file = path.join(dataDir, 'opportunities.json');

  await fs.mkdir(dataDir, { recursive: true });

  let records: OpportunityRecord[] = [];

  try {
    const existing = await fs.readFile(file, 'utf8');
    records = JSON.parse(existing);

    if (!Array.isArray(records)) {
      records = [];
    }
  } catch {
    records = [];
  }

  records.unshift(record);

  // Keep local storage bounded.
  records = records.slice(0, 1000);

  await fs.writeFile(
    file,
    JSON.stringify(records, null, 2),
    'utf8',
  );
}

async function sendWebhook(record: OpportunityRecord) {
  const webhook = process.env.OPPORTUNITY_WEBHOOK_URL;

  if (!webhook) {
    return;
  }

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'portfolio_opportunity',
        lead: record,
      }),
      cache: 'no-store',
    });
  } catch {
    // Webhook failure must not make the local lead disappear.
  }
}

export async function POST(request: NextRequest) {
  try {
    const body =
      (await request.json()) as OpportunityPayload;

    // Honeypot anti-spam field.
    if (clean(body.website, 200)) {
      return NextResponse.json({
        ok: true,
        message: 'Inquiry received.',
      });
    }

    const inquiryType = clean(body.inquiryType, 100);
    const name = clean(body.name, 150);
    const email = clean(body.email, 200);
    const company = clean(body.company, 200);
    const project = clean(body.project, 200);
    const message = clean(body.message, MAX_MESSAGE_LENGTH);
    const budget = clean(body.budget, 100);
    const timeline = clean(body.timeline, 100);
    const reference = clean(body.reference, 500);

    if (!ALLOWED_TYPES.includes(inquiryType)) {
      return jsonError('Please select a valid inquiry type.');
    }

    if (!name || name.length < 2) {
      return jsonError('Please provide your name.');
    }

    if (!isValidEmail(email)) {
      return jsonError('Please provide a valid work email.');
    }

    if (!message || message.length < 20) {
      return jsonError(
        'Please provide more detail about the opportunity.',
      );
    }

    if (budget && !ALLOWED_BUDGETS.includes(budget)) {
      return jsonError('Invalid budget selection.');
    }

    if (timeline && !ALLOWED_TIMELINES.includes(timeline)) {
      return jsonError('Invalid timeline selection.');
    }

    if (
      reference &&
      !/^https?:\/\/.+/i.test(reference)
    ) {
      return jsonError(
        'Reference must be a valid http or https URL.',
      );
    }

    const forwardedFor =
      request.headers.get('x-forwarded-for') ??
      request.headers.get('x-real-ip') ??
      '';

    const ip = forwardedFor.split(',')[0]?.trim();

    const record: OpportunityRecord = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      inquiryType,
      name,
      email,
      company,
      project,
      message,
      budget,
      timeline,
      reference,
      ip,
      userAgent:
        request.headers.get('user-agent') ?? undefined,
    };

    await saveLead(record);
    await sendWebhook(record);

    return NextResponse.json(
      {
        ok: true,
        id: record.id,
        message: 'Opportunity inquiry received.',
      },
      { status: 201 },
    );
  } catch {
    return jsonError(
      'Unable to process the inquiry right now.',
      500,
    );
  }
}
