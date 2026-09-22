import Image from 'next/image';
import {
  ArrowUpRight,
  FileText,
  BrainCircuit,
  Database,
  Layers3,
  Smartphone,
  Handshake,
} from 'lucide-react';
import Link from 'next/link';

import Nav from '@/components/Nav';
import Reveal from '@/components/Reveal';
import ProjectCard from '@/components/ProjectCard';
import GithubStats from '@/components/GithubStats';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        {/* HERO */}
        <section className="grid-bg relative isolate flex min-h-screen items-center overflow-hidden pt-16">
          {/* HEADER BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/background_header.png"
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* DARK READABILITY OVERLAY */}
          <div className="absolute inset-0 z-[1] bg-black/45" />

          {/* CINEMATIC GRADIENT */}
          <div
            className="absolute inset-0 z-[2]"
            style={{
              background:
                'linear-gradient(90deg, rgba(3,7,18,.96) 0%, rgba(3,7,18,.78) 38%, rgba(3,7,18,.30) 72%, rgba(3,7,18,.55) 100%)',
            }}
          />

          {/* BOTTOM FADE */}
          <div
            className="absolute inset-x-0 bottom-0 z-[3] h-64"
            style={{
              background:
                'linear-gradient(to top, rgba(6,7,10,1), rgba(6,7,10,0))',
            }}
          />

          {/* HERO CONTENT */}
          <div className="container relative z-10 py-28">
            <Reveal>
              <div className="max-w-4xl">
                <p className="kicker">AI Transformation Leader</p>

                <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                  Designing &amp; building
                  <span className="block bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent">
                    intelligent digital systems.
                  </span>
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                  Senior Software Architect · AI Engineer · Full-Stack
                  Developer. Building AI, data, mobile, backend and modern
                  digital products.
                </p>

                {/* HERO CTA */}
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#work"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-black transition-all duration-300 hover:bg-slate-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)]"
                  >
                    Explore Work
                  </a>

                  <Link
                    href="/opportunity"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-sky-300/30 bg-sky-300/10 px-6 text-sm font-bold text-sky-200 backdrop-blur-sm transition-all duration-300 hover:border-sky-300/60 hover:bg-sky-300/20 hover:text-white hover:shadow-[0_0_24px_rgba(125,211,252,0.12)]"
                  >
                    <Handshake className="mr-2 size-4 shrink-0" />
                    Start an Opportunity
                  </Link>

                  <a
                    href="https://github.com/sazwarriyadhs"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
                  >
                    GitHub
                    <ArrowUpRight className="ml-2 size-4 shrink-0" />
                  </a>

                  <Link
                    href="/cv"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
                  >
                    <FileText className="mr-2 size-4 shrink-0" />
                    Download CV
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* HERO CAPABILITIES */}
            <div className="mt-20 grid max-w-4xl gap-3 sm:grid-cols-4">
              {[
                [BrainCircuit, 'AI'],
                [Layers3, 'Architecture'],
                [Smartphone, 'Mobile'],
                [Database, 'Data'],
              ].map(([Icon, label]) => {
                const C = Icon as typeof BrainCircuit;

                return (
                  <div
                    key={label as string}
                    className="glass rounded-2xl bg-black/25 p-5 backdrop-blur-md"
                  >
                    <C className="size-5 text-sky-300" />

                    <div className="mt-4 text-sm font-semibold">
                      {label as string}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="section">
          <div className="container">
            <Reveal>
              <p className="kicker">Featured Work</p>

              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                Selected systems &amp; products.
              </h2>

              <p className="mt-5 max-w-2xl text-slate-400">
                A curated view focused on AI, intelligence, architecture,
                data, FinTech and digital agriculture.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* AI */}
        <section
          id="ai"
          className="section border-y border-white/5 bg-white/[.015]"
        >
          <div className="container">
            <Reveal>
              <p className="kicker">AI Transformation</p>

              <h2 className="mt-3 max-w-3xl text-4xl font-bold sm:text-6xl">
                From intelligence to production software.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                'Generative AI',
                'RAG & AI Agents',
                'Prediction & Recommendation',
                'Computer Vision',
                'Intelligent Automation',
                'Decision Support',
              ].map((x) => (
                <div key={x} className="card rounded-2xl p-6">
                  <div className="mono text-xs text-sky-300">
                    AI CAPABILITY
                  </div>

                  <h3 className="mt-4 text-xl font-semibold">{x}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section id="architecture" className="section">
          <div className="container">
            <Reveal>
              <p className="kicker">Architecture Lab</p>

              <h2 className="mt-3 text-4xl font-bold sm:text-6xl">
                Strategy → Architecture → Engineering → Product.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass mt-12 overflow-hidden rounded-3xl p-6 sm:p-10">
                <div className="mono mb-8 text-xs text-slate-500">
                  REFERENCE SYSTEM PATTERN
                </div>

                <div className="grid gap-3 text-center text-sm sm:grid-cols-5">
                  {[
                    'Web / Mobile',
                    'API Gateway',
                    'Domain Services',
                    'AI Services',
                    'Data Layer',
                  ].map((x, i) => (
                    <div
                      key={x}
                      className="rounded-xl border border-white/10 p-5"
                    >
                      <div className="text-sky-300">0{i + 1}</div>
                      <div className="mt-3 font-semibold">{x}</div>
                    </div>
                  ))}
                </div>

                <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-400">
                  Architecture diagrams are patterns for the portfolio;
                  project-specific diagrams should be filled from verified
                  source code and documentation.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section
          id="technology"
          className="section border-y border-white/5 bg-white/[.015]"
        >
          <div className="container">
            <Reveal>
              <p className="kicker">Technology</p>

              <h2 className="mt-3 text-4xl font-bold sm:text-6xl">
                Modern engineering toolkit.
              </h2>
            </Reveal>

            <div className="mt-12 flex flex-wrap gap-3">
              {[
                'Go',
                'Python',
                'TypeScript',
                'JavaScript',
                'Dart',
                'Node.js',
                'FastAPI',
                'React',
                'Next.js',
                'Flutter',
                'React Native',
                'PostgreSQL',
                'MongoDB',
                'Redis',
                'Docker',
                'Kubernetes',
                'AWS',
                'GCP',
                'OpenAI',
                'LangChain',
                'RAG',
                'AI Agents',
                'TensorFlow',
                'Solidity',
                'Ethereum',
                'IPFS',
              ].map((x) => (
                <span
                  key={x}
                  className="glass rounded-full px-4 py-2 text-sm text-slate-300"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* GITHUB */}
        <section id="github" className="section">
          <div className="container">
            <Reveal>
              <p className="kicker">GitHub Intelligence</p>

              <h2 className="mt-3 text-4xl font-bold sm:text-6xl">
                A living engineering profile.
              </h2>

              <p className="mt-5 max-w-2xl text-slate-400">
                Repository metrics are fetched from GitHub and cached for one
                hour.
              </p>
            </Reveal>

            <div className="mt-10">
              <GithubStats />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section border-t border-white/5">
          <div className="container">
            <Reveal>
              <p className="kicker">Contact &amp; Opportunities</p>

              <h2 className="mt-3 max-w-3xl text-4xl font-bold sm:text-6xl">
                Let&apos;s build intelligent systems.
              </h2>

              <p className="mt-5 max-w-2xl text-slate-400">
                Open for project development, strategic partnerships, AI
                transformation, consulting and investment opportunities.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/opportunity"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-black transition-all duration-300 hover:bg-slate-100"
                >
                  <Handshake className="mr-2 size-4" />
                  Start an Opportunity
                </Link>

                <a
                  href="https://github.com/sazwarriyadhs"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-bold transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05]"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/azwarriyadh/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-bold transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05]"
                >
                  LinkedIn
                </a>

                <Link
                  href="/cv"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-bold transition-all duration-300 hover:border-sky-300/30 hover:bg-white/[0.05] hover:text-sky-200"
                >
                  <FileText className="mr-2 size-4" />
                  Download CV
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8">
        <div className="container flex flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Azwar Riyadh Subarkah
          </span>

          <span className="mono">PORTFOLIO V6</span>
        </div>
      </footer>
    </>
  );
}
