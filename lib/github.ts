export type GithubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
};

export type GithubRepository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string | null;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  default_branch?: string;
};

export type GithubReadme = {
  content: string;
  htmlUrl: string;
};

const GITHUB_USER = 'sazwarriyadhs';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export async function getGithubRepositories(): Promise<GithubRepository[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&direction=desc`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return [];

    const repos = (await res.json()) as GithubRepository[];

    return repos.filter(
      (repo) => !repo.fork && !repo.archived,
    );
  } catch {
    return [];
  }
}

export async function getGithubRepository(
  repository: string,
): Promise<GithubRepository | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${encodeURIComponent(repository)}`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export async function getGithubReadme(
  repository: string,
): Promise<GithubReadme | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${encodeURIComponent(repository)}/readme`,
      {
        headers: {
          ...getHeaders(),
          Accept: 'application/vnd.github.raw+json',
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const content = await res.text();

    return {
      content,
      htmlUrl: `https://github.com/${GITHUB_USER}/${repository}/blob/main/README.md`,
    };
  } catch {
    return null;
  }
}

export function extractRepositoryName(githubUrl: string): string {
  try {
    const url = new URL(githubUrl);
    const parts = url.pathname
      .split('/')
      .filter(Boolean);

    return parts[parts.length - 1] ?? '';
  } catch {
    return '';
  }
}

function normalizeHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function findSection(
  markdown: string,
  aliases: string[],
): string | null {
  const lines = markdown.split('\n');

  const normalizedAliases = aliases.map(normalizeHeading);

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^#{1,4}\s+(.+)$/);

    if (!match) continue;

    const heading = normalizeHeading(match[1]);

    if (!normalizedAliases.includes(heading)) continue;

    const content: string[] = [];

    for (let j = i + 1; j < lines.length; j += 1) {
      if (/^#{1,4}\s+/.test(lines[j])) break;
      content.push(lines[j]);
    }

    const cleaned = cleanMarkdown(content.join('\n'));

    if (cleaned) return cleaned;
  }

  return null;
}

function firstReadableParagraph(markdown: string): string | null {
  const cleaned = cleanMarkdown(
    markdown
      .replace(/^#{1,6}\s+.*$/gm, '')
      .replace(/^\s*>\s?/gm, '')
      .split('\n\n')
      .filter(Boolean)
      .slice(0, 2)
      .join('\n\n'),
  );

  return cleaned || null;
}

export function buildRepositoryEvidence(
  repository: GithubRepository | null,
  readme: GithubReadme | null,
) {
  const markdown = readme?.content ?? '';

  const overview =
    repository?.description ||
    firstReadableParagraph(markdown) ||
    null;

  const problem = findSection(markdown, [
    'problem',
    'problem statement',
    'challenge',
    'challenges',
    'the problem',
    'why',
  ]);

  const solution = findSection(markdown, [
    'solution',
    'the solution',
    'approach',
    'how it works',
  ]);

  const architecture = findSection(markdown, [
    'architecture',
    'system architecture',
    'technical architecture',
    'project structure',
    'structure',
  ]);

  const engineering = findSection(markdown, [
    'engineering highlights',
    'highlights',
    'features',
    'key features',
    'capabilities',
  ]);

  const technology = findSection(markdown, [
    'technology',
    'technologies',
    'tech stack',
    'technology stack',
    'stack',
    'built with',
  ]);

  return {
    overview,
    problem,
    solution,
    architecture,
    engineering,
    technology,
    readmeAvailable: Boolean(readme),
    readmeUrl: readme?.htmlUrl ?? null,
  };
}

export async function getGithubIntelligence() {
  const [profile, repositories] = await Promise.all([
    getGithubProfile(),
    getGithubRepositories(),
  ]);

  const selected = repositories
    .sort((a, b) => {
      const scoreA =
        a.stargazers_count * 10 +
        a.forks_count * 5 +
        new Date(a.pushed_at ?? a.updated_at).getTime() / 1e10;

      const scoreB =
        b.stargazers_count * 10 +
        b.forks_count * 5 +
        new Date(b.pushed_at ?? b.updated_at).getTime() / 1e10;

      return scoreB - scoreA;
    })
    .slice(0, 6);

  const languages = repositories.reduce<Record<string, number>>(
    (acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] ?? 0) + 1;
      }

      return acc;
    },
    {},
  );

  return {
    profile,
    repositories,
    selected,
    languages,
  };
}