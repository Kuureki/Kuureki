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
      'Discord economy bot with full relationship mechanics — ownership, trading, marriage, and a community activity feed. Real-ESRGAN image upscale pipeline.',
    fullDesc:
      'Megami is a Discord economy bot built around a full relationship economy. It goes beyond simple card collection — featuring ownership transfers, trading mechanics, marriage systems, and a community activity feed that surfaces notable events.\n\nThe bot was designed by studying existing bot economies deeply and asking what a relationship-driven economy could look like. Image processing uses a Real-ESRGAN upscale pipeline for high-quality card generation, with napi-rs canvas for performant image rendering.',
    tags: [
      'Discord.js',
      'napi-rs canvas',
      'PostgreSQL',
      'GraphQL',
      'Real-ESRGAN',
      'Cloudflare Workers',
    ],
    highlights: [
      'Full relationship economy with ownership and trading mechanics',
      'Skin and print number rarity system',
      'Trading windows, marriage mechanics, and succession chains',
      'Community activity feed for notable events',
      'Real-ESRGAN upscale pipeline for card images',
    ],
    url: 'https://megami.dev',
  },
  {
    slug: 'brume',
    num: '03',
    name: 'Brume',
    status: 'Active',
    shortDesc:
      'Realtime WebSocket gateway built in Rust. A single binary that handles pub/sub, presence tracking, and Postgres change streams. Flat-rate, stack-agnospheric.',
    fullDesc:
      'Brume is a realtime WebSocket gateway built in Rust. A single binary that connects to any Postgres database and exposes typed pub/sub channels, rich presence, and a REST API for server-side publishing.\n\nThe architecture is designed around transparency — messages are fire-and-forget, nothing is persisted, and the system is intentionally boring. It competes with Pusher and Ably but differentiates by being entirely self-hostable, DB-agnostic, and privacy-by-design.\n\nThe TypeScript SDK is the primary interface. Event schemas are defined once and propagate as fully typed payloads across the entire stack. The transport layer falls back gracefully: WebSocket → SSE → long-polling for environments where raw sockets aren\'t available.',
    tags: [
      'Rust',
      'axum',
      'tokio',
      'WebSocket',
      'PostgreSQL LISTEN/NOTIFY',
      'TypeScript SDK',
    ],
    highlights: [
      'Rust binary — tens of thousands of concurrent connections on modest hardware',
      'Zero-dependency TypeScript SDK with full type inference from event schemas',
      'Postgres LISTEN/NOTIFY for changefeed without a separate relay process',
      'Multi-transport fallback chain: WebSocket → SSE → long-polling',
      'Flat-rate pricing, no connection-based billing',
    ],
    url: 'https://brume.io',
  },
  {
    slug: 'seasonly',
    num: '02',
    name: 'Seasonly',
    status: 'Active',
    shortDesc:
      "Premium fantasy anime league platform. Draft your predicted top 10 shows each season, compete in private or public leagues, and score based on real AniList performance data. Built as a quality-first replacement for MAL's neglected FAL.",
    fullDesc:
      "Seasonly is a fantasy anime league platform built around the natural cadence of the anime calendar — Winter, Spring, Summer, Fall. Each season, users draft their predicted top 10 shows before the season locks, then compete in head-to-head league matchups scored against real AniList data.\n\nThe scoring model goes beyond naive popularity tracking. It uses a prediction-accuracy system with pre-season expectation baselines derived from AniList popularity, trending, meanScore, and favourites at draft-lock time — combined with a rank-position multiplier. Dark horse picks that genuinely overperform score more than obvious frontrunners that simply deliver as expected.\n\nPrivate leagues with invite codes, AniList OAuth as the sole auth method, and a Noir Gold design system differentiate it from the only real competitor: MAL's Fantasy Anime League, which has an active user base but no design investment, broken onboarding, and zero feature iteration.",
    tags: ['Next.js', 'TypeScript', 'Tailwind v4', 'Drizzle ORM', 'PostgreSQL', 'AniList GraphQL'],
    highlights: [
      'Prediction-accuracy scoring model with pre-season expectation baselines',
      'Private leagues with invite codes — a key gap in MAL FAL',
      'AniList OAuth integration as both auth and social proof',
      'Live data pipeline — no anime metadata stored, always fetched real-time',
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
