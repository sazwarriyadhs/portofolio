'use client';

import { ArrowLeft, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CVPage() {
  return (
    <main className="min-h-screen bg-[#06070a] px-5 py-8 text-slate-100 sm:px-8 print:bg-white print:px-0 print:py-0 print:text-black">
      <div className="mx-auto max-w-[900px]">

        {/* ACTION BAR */}
        <div className="mb-8 flex items-center justify-between print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to portfolio
          </Link>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-slate-200"
          >
            <Download className="size-4" />
            Download PDF
          </button>
        </div>

        {/* CV */}
        <article className="rounded-3xl border border-white/10 bg-[#0c0f14] p-7 shadow-2xl sm:p-12 print:rounded-none print:border-0 print:bg-white print:p-10 print:shadow-none">

          {/* HEADER */}
          <header className="border-b border-white/10 pb-8 print:border-black/20">
            <div className="flex flex-col justify-between gap-6 sm:flex-row">
              <div>
                <p className="mono text-xs tracking-[0.25em] text-sky-300 print:text-slate-600">
                  AI TRANSFORMATION LEADER
                </p>

                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl print:text-black">
                  Azwar Riyadh Subarkah
                </h1>

                <p className="mt-3 text-lg text-slate-400 print:text-slate-700">
                  Senior Software Architect · AI Engineer · Full-Stack Developer
                </p>
              </div>

              <div className="space-y-2 text-sm text-slate-400 print:text-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  Bogor, Indonesia
                </div>

                <a
                  href="https://www.linkedin.com/in/azwarriyadh/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-sky-300 print:text-black"
                >
                  <Linkedin className="size-4" />
                  linkedin.com/in/azwarriyadh
                </a>

                <a
                  href="https://github.com/sazwarriyadhs"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-sky-300 print:text-black"
                >
                  <Github className="size-4" />
                  github.com/sazwarriyadhs
                </a>
              </div>
            </div>
          </header>

          {/* SUMMARY */}
          <section className="mt-8">
            <h2 className="cv-heading">Professional Profile</h2>

            <p className="cv-text">
              AI Transformation Leader and Senior Software Architect with
              extensive experience designing and building intelligent digital
              systems across artificial intelligence, backend engineering,
              full-stack development, mobile applications, data platforms,
              cloud infrastructure, and blockchain technologies.
            </p>

            <p className="cv-text">
              Focused on transforming business requirements into scalable
              software architectures, production-ready applications, and
              AI-enabled products that connect strategy, engineering, data,
              and user experience.
            </p>
          </section>

          {/* CORE */}
          <section className="mt-8">
            <h2 className="cv-heading">Core Expertise</h2>

            <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                'AI Transformation & Intelligent Systems',
                'Senior Software Architecture',
                'Generative AI / RAG / LLM Applications',
                'Backend & Distributed Systems',
                'Full-Stack Web Development',
                'Mobile Application Engineering',
                'Data & Database Architecture',
                'Cloud & DevOps',
                'Blockchain & Web3',
                'Technical Product Engineering',
              ].map((item) => (
                <div key={item} className="cv-bullet">
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* TECHNOLOGY */}
          <section className="mt-8">
            <h2 className="cv-heading">Technology Stack</h2>

            <div className="space-y-4 text-sm leading-7">
              <div>
                <strong>AI:</strong>{' '}
                GPT, OpenAI API, LangChain, RAG, LLM applications,
                intelligent agents, recommendation systems, forecasting
              </div>

              <div>
                <strong>Backend:</strong>{' '}
                Go, Node.js, Python, FastAPI, Django, .NET
              </div>

              <div>
                <strong>Frontend:</strong>{' '}
                React, Next.js, TypeScript, React Native, Flutter
              </div>

              <div>
                <strong>Data:</strong>{' '}
                PostgreSQL, MongoDB, MySQL, Redis, Supabase
              </div>

              <div>
                <strong>Cloud & DevOps:</strong>{' '}
                Docker, Kubernetes, AWS, GCP, GitHub Actions
              </div>

              <div>
                <strong>Blockchain:</strong>{' '}
                Solidity, Ethereum, Hardhat, Web3, IPFS
              </div>
            </div>
          </section>

          {/* SELECTED WORK */}
          <section className="mt-8">
            <h2 className="cv-heading">Selected Engineering Work</h2>

            <div className="space-y-6">
              <div>
                <h3 className="cv-title">RASMART AI</h3>
                <p className="cv-text">
                  AI-enabled retail ecosystem combining customer applications,
                  backend services, delivery operations, loyalty, promotion
                  intelligence, recommendation, forecasting, and AI shopping
                  assistance.
                </p>
              </div>

              <div>
                <h3 className="cv-title">Borneo Sentinel</h3>
                <p className="cv-text">
                  Regional disaster intelligence platform integrating
                  geospatial intelligence, incident monitoring, risk analysis,
                  AI prediction, anomaly detection, and field decision support.
                </p>
              </div>

              <div>
                <h3 className="cv-title">MegaTrust EW</h3>
                <p className="cv-text">
                  Multi-hazard early-warning architecture covering earthquake,
                  volcano, extreme weather, alerting, impact analysis, and
                  disaster intelligence.
                </p>
              </div>

              <div>
                <h3 className="cv-title">AI Hospitality Reputation Guard</h3>
                <p className="cv-text">
                  AI-driven hospitality reputation intelligence platform
                  designed to audit digital reputation signals and convert
                  findings into actionable business recommendations.
                </p>
              </div>
            </div>
          </section>

          {/* GITHUB */}
          <section className="mt-8">
            <h2 className="cv-heading">Engineering Footprint</h2>

            <p className="cv-text">
              Active GitHub engineering portfolio with public repositories
              spanning AI, software engineering, fintech, digital
              intelligence, AgriTech, mobile applications, data systems,
              and experimental product development.
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a
                href="https://github.com/sazwarriyadhs"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sky-300 print:text-black"
              >
                GitHub Profile →
              </a>

              <a
                href="https://www.linkedin.com/in/azwarriyadh/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sky-300 print:text-black"
              >
                LinkedIn Profile →
              </a>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500 print:border-black/20 print:text-slate-600">
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <span>Azwar Riyadh Subarkah</span>
              <span>AI Transformation · Software Architecture · Engineering</span>
            </div>
          </footer>
        </article>
      </div>

      <style jsx global>{`
        .cv-heading {
          margin-bottom: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgb(125 211 252);
        }

        .cv-text {
          margin-top: 0.75rem;
          font-size: 0.875rem;
          line-height: 1.75;
          color: rgb(148 163 184);
        }

        .cv-title {
          font-size: 1rem;
          font-weight: 700;
          color: rgb(241 245 249);
        }

        .cv-bullet {
          position: relative;
          padding-left: 1rem;
          font-size: 0.875rem;
          color: rgb(203 213 225);
        }

        .cv-bullet::before {
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 9999px;
          background: rgb(125 211 252);
          content: '';
        }

        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          .cv-heading {
            color: #334155 !important;
          }

          .cv-text {
            color: #334155 !important;
          }

          .cv-title {
            color: #111827 !important;
          }

          .cv-bullet {
            color: #334155 !important;
          }

          .cv-bullet::before {
            background: #334155 !important;
          }

          a {
            color: #111827 !important;
            text-decoration: none !important;
          }
        }
      `}</style>
    </main>
  );
}
