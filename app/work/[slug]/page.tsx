import { notFound } from 'next/navigation';
import Link from 'next/link';

import { projects } from '@/data/projects';
import {
  buildRepositoryEvidence,
  extractRepositoryName,
  getGithubReadme,
  getGithubRepository,
} from '@/lib/github';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

function EvidenceSection({
  title,
  content,
}: {
  title: string;
  content: string | null;
}) {
  return (
    <section className="card rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        {content ? (
          <span className="mono text-[10px] uppercase tracking-widest text-emerald-300">
            Repository evidence
          </span>
        ) : (
          <span className="mono text-[10px] uppercase tracking-widest text-slate-500">
            Not documented
          </span>
        )}
      </div>

      <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-400">
        {content ?? 'Not documented in the repository README.'}
      </div>
    </section>
  );
}

function formatDate(value?: string | null) {
  if (!value) return '—';

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug,
  );

  if (!project) notFound();

  const repositoryName = extractRepositoryName(
    project.github,
  );

  const [repository, readme] = await Promise.all([
    getGithubRepository(repositoryName),
    getGithubReadme(repositoryName),
  ]);

  const evidence = buildRepositoryEvidence(
    repository,
    readme,
  );

  const technologies = Array.from(
    new Set([
      ...(project.technologies ?? []),
      ...(repository?.language ? [repository.language] : []),
      ...(repository?.topics ?? []),
    ]),
  );

  const title = repository?.name ?? project.name;

  const description =
    evidence.overview ??
    'Repository description is not available.';

  return (
    <main className="min-h-screen">
      <div className="container py-12 sm:py-20">
        <Link
          href="/#work"
          className="text-sm text-sky-300 transition hover:text-white"
        >
          ← Back to work
        </Link>

        <div className="mt-16 max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="kicker">{project.category}</p>

            {repository && (
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300">
                GitHub verified
              </span>
            )}
          </div>

          <h1 className="mt-4 text-5xl font-bold sm:text-7xl">
            {title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-300"
              >
                {technology}
              </span>
            ))}
          </div>

          {repository && (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="card rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Language
                </p>
                <p className="mt-2 font-semibold">
                  {repository.language ?? 'Not specified'}
                </p>
              </div>

              <div className="card rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Stars
                </p>
                <p className="mt-2 font-semibold">
                  {repository.stargazers_count}
                </p>
              </div>

              <div className="card rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Forks
                </p>
                <p className="mt-2 font-semibold">
                  {repository.forks_count}
                </p>
              </div>

              <div className="card rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Last push
                </p>
                <p className="mt-2 font-semibold">
                  {formatDate(repository.pushed_at)}
                </p>
              </div>
            </div>
          )}

          {repository?.topics &&
            repository.topics.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">
                  Repository topics
                </p>

                <div className="flex flex-wrap gap-2">
                  {repository.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-sky-300/10 bg-sky-300/5 px-3 py-1 text-xs text-sky-200"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            <EvidenceSection
              title="Overview"
              content={evidence.overview}
            />

            <EvidenceSection
              title="Problem"
              content={evidence.problem}
            />

            <EvidenceSection
              title="Solution"
              content={evidence.solution}
            />

            <EvidenceSection
              title="Architecture"
              content={evidence.architecture}
            />

            <EvidenceSection
              title="Engineering Highlights"
              content={evidence.engineering}
            />

            <EvidenceSection
              title="Technology"
              content={evidence.technology}
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={repository?.html_url ?? project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-slate-100"
            >
              View GitHub Repository →
            </a>

            {readme && (
              <a
                href={readme.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                View README
              </a>
            )}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Source: GitHub repository
              </span>

              <span>
                {repository
                  ? `Repository updated ${formatDate(
                      repository.updated_at,
                    )}`
                  : 'Repository metadata unavailable'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}