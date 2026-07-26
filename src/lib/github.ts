import { GITHUB_USERNAME } from './config';

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: number;
}

export async function getGitHubContributions(
  username: string = GITHUB_USERNAME,
): Promise<GitHubContributionDay[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!res.ok)
      return [];

    const events = await res.json();
    const counts: Record<string, number> = {};

    for (const event of events) {
      if (event.type && event.created_at) {
        const date = event.created_at.slice(0, 10);
        counts[date] = (counts[date] ?? 0) + 1;
      }
    }

    const days: GitHubContributionDay[] = [];
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 364);

    for (let i = 0; i < 365; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const iso = date.toISOString().split('T')[0];
      const count = counts[iso] ?? 0;
      const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4;
      days.push({ date: iso, count, level });
    }

    return days;
  }
  catch {
    return [];
  }
}

export async function getGitHubProfile(username: string = GITHUB_USERNAME) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    } as RequestInit);
    if (!res.ok)
      return null;
    return (await res.json()) as {
      public_repos: number;
      followers: number;
      following: number;
      avatar_url: string;
      html_url: string;
    };
  }
  catch {
    return null;
  }
}
