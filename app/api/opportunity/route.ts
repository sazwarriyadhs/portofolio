import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

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

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function clean(value: unknown, max = 500) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\u0000/g, '').slice(0, max);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char];
  });
}

async function sendWebhook(lead: Record<string, unknown>) {
  const webhook = process.env.OPPORTUNITY_WEBHOOK_URL?.trim();

  if (!webhook) return;

  try {
    const endpoint = new URL(webhook);

    if (!['http:', 'https:'].includes(endpoint.protocol)) {
      console.warn('Opportunity webhook skipped: unsupported URL protocol.');
      return;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'portfolio_opportunity',
        lead,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.warn(
        'Opportunity webhook returned HTTP status:',
        response.status,
      );
    }
  } catch (error) {
    console.warn(
      'Opportunity webhook delivery failed:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as OpportunityPayload;

    if (clean(body.website, 200)) {
      return NextResponse.json({ ok: true, message: 'Inquiry received.' });
    }

    const inquiryType = clean(body.inquiryType, 100);
    const name = clean(body.name, 150);
    const email = clean(body.email, 200);
    const company = clean(body.company, 200);
    const project = clean(body.project, 200);
    const message = clean(body.message, 5000);
    const budget = clean(body.budget, 100);
    const timeline = clean(body.timeline, 100);
    const reference = clean(body.reference, 500);

    if (!ALLOWED_TYPES.includes(inquiryType)) {
      return jsonError('Please select a valid inquiry type.');
    }
    if (name.length < 2) {
      return jsonError('Please provide your name.');
    }
    if (!isValidEmail(email)) {
      return jsonError('Please provide a valid work email.');
    }
    if (message.length < 20) {
      return jsonError('Please provide more detail about the opportunity.');
    }
    if (budget && !ALLOWED_BUDGETS.includes(budget)) {
      return jsonError('Invalid budget selection.');
    }
    if (timeline && !ALLOWED_TIMELINES.includes(timeline)) {
      return jsonError('Invalid timeline selection.');
    }
    if (reference && !isValidHttpUrl(reference)) {
      return jsonError('Reference must be a valid http or https URL.');
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.error('Opportunity email configuration is missing.');
      return jsonError('Email service is temporarily unavailable.', 503);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPassword.replace(/\s/g, ''),
      },
    });

    const fields: [string, string][] = [
      ['Inquiry type', inquiryType],
      ['Name', name],
      ['Work email', email],
      ['Company', company || 'Not provided'],
      ['Project', project || 'Not provided'],
      ['Budget', budget || 'Not provided'],
      ['Timeline', timeline || 'Not provided'],
      ['Reference', reference || 'Not provided'],
    ];

    const textBody = [
      'NEW BUSINESS / TECHNOLOGY INQUIRY',
      '',
      ...fields.map(([label, value]) => `${label}: ${value}`),
      '',
      'PROJECT OVERVIEW',
      message,
      '',
      'Sent from Azwar Riyadh Subarkah portfolio.',
    ].join('\n');

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;color:#222;line-height:1.6">
        <h2>New Business / Technology Inquiry</h2>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
          ${fields.map(([label, value]) => `
            <tr>
              <td style="border-bottom:1px solid #ddd"><strong>${escapeHtml(label)}</strong></td>
              <td style="border-bottom:1px solid #ddd">${escapeHtml(value)}</td>
            </tr>
          `).join('')}
        </table>
        <h3>Project Overview</h3>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        <hr>
        <small>Sent from Azwar Riyadh Subarkah portfolio.</small>
      </div>
    `;

    const forwardedFor =
      request.headers.get('x-forwarded-for') ??
      request.headers.get('x-real-ip') ??
      '';

    const lead: Record<string, unknown> = {
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
      ip: forwardedFor.split(',')[0]?.trim(),
      userAgent: request.headers.get('user-agent') ?? undefined,
    };
    const result = await transporter.sendMail({
      from: `"Azwar Riyadh Subarkah | Portfolio" <${gmailUser}>`,
      to: 'ptdigimediakomunika@gmail.com',
      cc: 'azwarriyadhdev@gmail.com',
      replyTo: email,
      subject: `[Portfolio Inquiry] ${inquiryType}`,
      text: textBody,
      html: htmlBody,
    });

    console.info('Opportunity email accepted by SMTP:', result.messageId);

    await sendWebhook(lead);

    return NextResponse.json(
      { ok: true, message: 'Your inquiry has been sent successfully.' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Opportunity email error:', error);
    return jsonError(
      'Unable to send your inquiry right now. Please try again later.',
      500,
    );
  }
}
