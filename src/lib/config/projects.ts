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
      'An AI admin for Discord. Talk to it in plain language — it proposes a plan, you approve, it runs. Every action audited and undoable.',
    fullDesc:
      'Seasonly is an AI admin for Discord servers. You talk to it like a colleague: @mention it, say what you want in plain language, and it negotiates like a person — proposing a short plan that runs only after your yes.\n\nThe architecture keeps the model on a short leash. The LLM never touches the Discord API: its only outputs are a schema-validated plan from a closed write vocabulary and calls to guarded meta-tools. Nothing executes without owner approval — a deterministic classifier decides consent, never the model — and every action writes an audit row with undo data. Say undo and it is undone.\n\nCoverage grows by promotion. Owners\' unmet requests land in a wishlist and become new guarded actions by demand frequency, so the bot grows capabilities where servers actually want them. It is served by me at seasonly.space — not open source and not self-hostable.',
    tags: ['TypeScript', 'Discord', 'Bun', 'PostgreSQL', 'Drizzle ORM', 'AI Agents'],
    highlights: [
      'The LLM never touches the Discord API — schema-validated plans from a closed write vocabulary only',
      'Nothing executes without owner approval; consent is decided by a deterministic classifier, not the model',
      'Every action is audited and reversible — say undo and it is undone',
      'Capabilities grow by promotion from a wishlist of real owner requests',
      'Hosted and served by me at seasonly.space',
    ],
    url: 'https://seasonly.space',
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
