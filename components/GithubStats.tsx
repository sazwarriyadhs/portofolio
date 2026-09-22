import {
  GitFork,
  Github,
  Star,
  Users,
  BookOpen,
  Code2,
  Activity,
} from 'lucide-react';

import { getGithubIntelligence } from '@/lib/github';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export default async function GithubStats() {
  const { profile, selected, languages } =
    await getGithubIntelligence();

  if (!profile) {
    return (
      <div className="glass rounded-3xl p-8">
        <div className="flex items-center gap-3">
          <Github className="size-5 text-sky-300" />
          <span className="font-semibold">
            GitHub data temporarily unavailable.
          </span>
        </div>

        <a
          href="https://github.com/sazwarriyadhs"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-sm font-semibold text-sky-300"
        >
          Open GitHub profile →
        </a>
      </div>
    );
  }

  const metrics = [
    {
      label: 'Repositories',
      value: profile.public_repos,
      icon: BookOpen,
    },
    {
      label: 'Followers',
      value: profile.followers,
      icon: Users,
    },
    {
      label: 'Following',
      value: profile.following,
      icon: Activity,
    },
    {
      label: 'Languages',
      value: Object.keys(languages).length,
      icon: Code2,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="glass rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-300/20"
          >
            <Icon className="size-5 text-sky-300" />

            <div className="mono mt-5 text-3xl font-bold">
              {value}
            </div>

            <div className="mt-2 text-sm text-slate-500">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="mono text-xs text-sky-300">
              ENGINEERING ACTIVITY
            </div>

            <h3 className="mt-2 text-2xl font-bold">
              Selected repositories.
            </h3>
          </div>

          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm font-semibold text-sky-300 sm:block"
          >
            View GitHub →
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {selected.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="group glass rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-300/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Github className="size-4 text-slate-500 transition group-hover:text-sky-300" />

                    <h4 className="truncate font-semibold">
                      {repo.name}
                    </h4>
                  </div>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
                    {repo.description ??
                      'Engineering project and software system.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                {repo.language && (
                  <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
                    {repo.language}
                  </span>
                )}

                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5" />
                  {repo.stargazers_count}
                </span>

                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3.5" />
                  {repo.forks_count}
                </span>

                <span className="ml-auto">
                  {formatDate(repo.pushed_at ?? repo.updated_at)}
                </span>
              </div>
            </a>
          ))}
        </div>

        <a
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 sm:hidden"
        >
          <Github className="size-4" />
          View GitHub profile →
        </a>
      </div>
    </div>
  );
}
