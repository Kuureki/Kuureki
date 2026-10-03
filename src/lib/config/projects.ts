export interface Project {
  slug: string;
  num: string;
  name: string;
  status: 'Active' | 'Shipped' | 'Archived';
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  highlights?: string[];
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'seasonly',
    num: '01',
    name: 'Seasonly',
    status: 'Active',
    shortDesc:
      'A roguelike that runs entirely inside Discord. Five floors, a boss, loot, and a weekly leaderboard, every screen drawn as a single card.',
    fullDesc:
      'Seasonly is a text-native roguelike for Discord. One command starts a run: you walk a path, fight, and either take the loot or leave it. Death forfeits the run\'s gold but keeps your gear and XP, and weekly scores reset without ever wiping what you own.\n\nThe engine is a separate package with no Discord imports and no clock of its own, so a run is fully deterministic and testable without a bot or a network. No art, no model in the loop, and no paid randomness.',
    tags: ['TypeScript', 'Discord', 'Bun', 'PostgreSQL', 'Drizzle ORM'],
    highlights: [
      'Five floors, a boss, loot, and a weekly leaderboard, all as native Discord cards',
      'Death costs the run its gold, never your gear or your XP',
      'The game engine is a pure package: no Discord imports, no clock, seeded RNG',
      'No art, no LLM in the loop, and no paid randomness',
    ],
  },
  {
    slug: 'brume',
    num: '02',
    name: 'Brume',
    status: 'Active',
    shortDesc:
      'A rate-limiting API. Sliding-window, token-bucket, and more as one atomic check — flat-rate, no Redis to manage. Served by me.',
    fullDesc:
      'Brume is a rate-limiting API. One endpoint answers the only question that matters — should this request through? — using the algorithm you pick per rule: token bucket, fixed window, sliding window log, or sliding window counter. All of them run as atomic Lua scripts in Redis, so a check is one round-trip and race-free.\n\nRules live in Postgres and are cached in-process with cross-node invalidation, so evaluation stays microseconds even under load. Per-identifier overrides, long-window quotas, blocklists, analytics, and a fail-open guarantee: if the Redis is unreachable, the gateway allows the request and records a degraded check rather than locking you out.\n\nThere are TypeScript and Rust SDKs with an ephemeral cache and timeout fallback baked in, plus a dashboard for rules and analytics. Pricing is flat-rate — no per-request billing, no scaling surprises. It is served by me at brume.run — not open source and not self-hostable.',
    tags: ['Rust', 'Axum', 'Tokio', 'Redis', 'PostgreSQL', 'TypeScript SDK'],
    highlights: [
      'Four algorithms — token bucket, fixed window, sliding window log, sliding window counter — as atomic Lua scripts',
      'A check is one Redis round-trip: microseconds, race-free',
      'Fail-open by design — Redis loss allows traffic and records a degraded check, never locks you out',
      'Flat-rate pricing. No per-request billing, no scaling surprises',
      'Hosted and served by me at brume.run',
    ],
    url: 'https://brume.run',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map(p => p.slug);
}
