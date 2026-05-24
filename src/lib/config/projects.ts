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
    slug: 'megami',
    num: '01',
    name: 'Megami',
    status: 'Active',
    shortDesc:
      'Community-driven Discord economy bot with ownership, trading, and relationship mechanics. Real-ESRGAN image pipeline for high-quality card visuals.',
    fullDesc:
      'Megami is a Discord economy bot built around a full relationship economy. It goes beyond simple card collection — featuring ownership transfers, trading mechanics, marriage systems, and a community activity feed that surfaces notable events as they happen.\n\nCard visuals are generated through a custom Real-ESRGAN upscale pipeline, rendered via napi-rs for performance. Every card has a skin and print number, making each one unique and tradeable.\n\nThe economy is designed to feel alive — trading windows, succession chains, and seasonal events keep the meta evolving without requiring constant manual intervention.',
    tags: [
      'Discord.js',
      'napi-rs canvas',
      'PostgreSQL',
      'GraphQL',
      'Real-ESRGAN',
      'Cloudflare Workers',
    ],
    highlights: [
      'Full relationship economy — ownership, trading, marriage, succession',
      'Skins and print numbers make every card unique and collectible',
      'Community activity feed surfaces notable events in real time',
      'Real-ESRGAN upscale pipeline for premium card visuals',
      'Fully self-hosted — your server, your rules',
    ],
    url: 'https://megami.dev',
  },
  {
    slug: 'brume',
    num: '03',
    name: 'Brume',
    status: 'Active',
    shortDesc:
      'Realtime WebSocket gateway built in Rust. Typed pub/sub channels, presence tracking, and Postgres change streams — as a single deployable binary. Flat-rate pricing, no per-connection billing.',
    fullDesc:
      'Brume is a realtime WebSocket gateway for teams that need pub/sub infrastructure without the SaaS lock-in. A single Rust binary connects to your existing Postgres database and exposes typed pub/sub channels, presence, and a REST API for server-side publishing.\n\nDefine your event schema once. Messages propagate as fully typed payloads across every client — TypeScript, Python, Go, whatever your stack speaks. The transport layer falls back gracefully: WebSocket → SSE → long-polling for environments where raw sockets are not available.\n\nPricing is flat-rate. No per-connection billing, no scaling surprises. Built for teams who want to own their realtime infrastructure and deploy it wherever they run their code.',
    tags: [
      'Rust',
      'axum',
      'tokio',
      'WebSocket',
      'PostgreSQL LISTEN/NOTIFY',
      'TypeScript SDK',
    ],
    highlights: [
      'Single binary — no separate relay process, no dependency on external services',
      'Fully typed event schemas propagate as typed payloads across your entire stack',
      'Presence tracking built in — roster, count, and custom state',
      'Multi-transport fallback chain: WebSocket → SSE → long-polling',
      'Self-hostable or use Brume Cloud — same SDK, same API either way',
    ],
    url: 'https://brume.io',
  },
  {
    slug: 'seasonly',
    num: '02',
    name: 'Seasonly',
    status: 'Active',
    shortDesc:
      'Premium seasonal fantasy league platform. Draft your predicted top shows each season, compete in private or public leagues, scored against real AniList data. Flat-rate pricing, no premium features locked behind paywalls.',
    fullDesc:
      'Seasonly is a fantasy league platform built around the natural cadence of seasonal entertainment — Winter, Spring, Summer, Fall. Each season, users draft their predicted top 10 shows before the season locks, then compete in head-to-head league matchups scored against real AniList data.\n\nThe scoring model rewards accurate predictions over obvious frontrunners. Pre-season baselines are derived from AniList popularity, trending, meanScore, and favourites at draft-lock time — combined with a rank-position multiplier. Dark horse picks that genuinely overperform score more than safe selections that simply deliver as expected.\n\nPrivate leagues with invite codes, AniList OAuth as the sole auth method, and a Noir Gold design system fill the gaps left by the only other option — MAL Fantasy Anime League, which has an active user base but no design investment and zero feature iteration.',
    tags: ['Next.js', 'TypeScript', 'Tailwind v4', 'Drizzle ORM', 'PostgreSQL', 'AniList GraphQL'],
    highlights: [
      'Prediction-accuracy scoring model — rewards dark horse picks over safe selections',
      'Private and public leagues with invite codes',
      'AniList OAuth — no separate account needed',
      'Real-time data pipeline, no stale metadata stored locally',
      'Noir Gold design system: true black, ivory, and gold as sole accent',
    ],
    url: 'https://seasonly.space',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
