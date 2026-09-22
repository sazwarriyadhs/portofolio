'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

type InquiryType =
  | 'Project Development'
  | 'Strategic Partnership'
  | 'AI Transformation'
  | 'Consulting'
  | 'Investment'
  | 'Other';

const inquiryTypes: InquiryType[] = [
  'Project Development',
  'Strategic Partnership',
  'AI Transformation',
  'Consulting',
  'Investment',
  'Other',
];

const budgets = [
  '< $10K',
  '$10K – $50K',
  '$50K – $250K',
  '$250K+',
  'Not decided yet',
];

const timelines = [
  'ASAP',
  '1–3 months',
  '3–6 months',
  '6–12 months',
  'Flexible',
];

export default function OpportunityPage() {
  const [type, setType] = useState<InquiryType>('Project Development');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#06070a] text-white">
      <header className="border-b border-white/10">
        <div className="container flex h-20 items-center justify-between px-6">
          <Link
            href="/"
            className="mono text-sm font-bold tracking-[0.2em] text-sky-300"
          >
            ARS / V6
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            ← Back to portfolio
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-[140px]" />

        <div className="container relative px-6 py-20 sm:py-28">
          <div className="max-w-4xl">
            <p className="mono text-xs font-semibold tracking-[0.25em] text-sky-300">
              BUSINESS / TECHNOLOGY OPPORTUNITY
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-7xl">
              Build something
              <span className="block text-slate-400">
                significant.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
              Have a technology project, strategic partnership,
              AI transformation initiative, or investment opportunity?
              Let&apos;s start with the opportunity.
            </p>
          </div>
        </div>
      </section>

      <section className="container px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <aside>
            <div className="glass rounded-3xl p-7 sm:p-9">
              <p className="mono text-xs text-sky-300">
                WHAT I CAN WORK ON
              </p>

              <div className="mt-7 space-y-5">
                {[
                  ['01', 'AI Transformation', 'AI strategy, RAG, agents, automation and intelligent systems.'],
                  ['02', 'Software Architecture', 'Scalable platforms, distributed systems and modernization.'],
                  ['03', 'Product Engineering', 'Web, mobile, backend and end-to-end product development.'],
                  ['04', 'Strategic Technology', 'Technology direction, architecture and technical leadership.'],
                  ['05', 'Venture / Investment', 'Technology-driven projects and co-development opportunities.'],
                ].map(([number, title, description]) => (
                  <div key={number} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <div className="mono text-xs text-slate-600">
                      {number}
                    </div>

                    <h2 className="mt-2 font-semibold">
                      {title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-sky-300/10 bg-sky-300/[0.03] p-7">
              <p className="mono text-xs text-sky-300">
                DIRECT CONTACT
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                For serious business, technology and investment
                opportunities, provide enough context for an initial
                assessment.
              </p>

              <a
                href="https://www.linkedin.com/in/azwarriyadh/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block text-sm font-semibold text-sky-300"
              >
                LinkedIn profile →
              </a>
            </div>
          </aside>

          <div className="glass rounded-3xl p-7 sm:p-10">
            {submitted ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                <div className="flex size-16 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-7 text-sky-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M5 12.5 9.5 17 19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="mono mt-7 text-xs text-sky-300">
                  INQUIRY READY
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Thank you.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
                  Your opportunity details have been captured.
                  The next step is connecting this form to the
                  preferred business communication channel.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-full border border-white/15 px-6 py-3 text-sm font-bold transition hover:border-white/30 hover:bg-white/5"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div>
                  <p className="mono text-xs text-sky-300">
                    STEP 01
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    What are you looking for?
                  </h2>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {inquiryTypes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setType(item)}
                        className={`rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition ${
                          type === item
                            ? 'border-sky-300/40 bg-sky-300/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="my-10 h-px bg-white/10" />

                <div>
                  <p className="mono text-xs text-sky-300">
                    STEP 02
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Tell me about the opportunity.
                  </h2>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Your name"
                      name="name"
                      placeholder="Full name"
                      required
                    />

                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      required
                    />

                    <Field
                      label="Company / organization"
                      name="company"
                      placeholder="Company name"
                    />

                    <Field
                      label="Project / venture"
                      name="project"
                      placeholder="Project or venture name"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="text-sm font-semibold text-slate-300">
                      Project overview
                    </label>

                    <textarea
                      name="message"
                      required
                      rows={7}
                      placeholder="What are you building, what problem does it solve, and what kind of collaboration are you looking for?"
                      className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-300/40"
                    />
                  </div>
                </div>

                <div className="my-10 h-px bg-white/10" />

                <div>
                  <p className="mono text-xs text-sky-300">
                    STEP 03
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Scope & expectations.
                  </h2>

                  <div className="mt-7">
                    <label className="text-sm font-semibold text-slate-300">
                      Estimated budget
                    </label>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {budgets.map((budget) => (
                        <label key={budget} className="cursor-pointer">
                          <input
                            type="radio"
                            name="budget"
                            value={budget}
                            className="peer sr-only"
                          />

                          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-slate-400 transition peer-checked:border-sky-300/40 peer-checked:bg-sky-300/10 peer-checked:text-white hover:border-white/20">
                            {budget}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <label className="text-sm font-semibold text-slate-300">
                      Expected timeline
                    </label>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {timelines.map((timeline) => (
                        <label key={timeline} className="cursor-pointer">
                          <input
                            type="radio"
                            name="timeline"
                            value={timeline}
                            className="peer sr-only"
                          />

                          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-slate-400 transition peer-checked:border-sky-300/40 peer-checked:bg-sky-300/10 peer-checked:text-white hover:border-white/20">
                            {timeline}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <label className="text-sm font-semibold text-slate-300">
                      Website / pitch deck
                    </label>

                    <input
                      name="reference"
                      type="text"
                      placeholder="https://... or pitch deck link"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-300/40"
                    />
                  </div>
                </div>

                <div className="my-10 h-px bg-white/10" />

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs leading-5 text-slate-600">
                      Selected inquiry:
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-300">
                      {type}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-sky-200"
                  >
                    Start the conversation →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-300">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-300/40"
      />
    </div>
  );
}
