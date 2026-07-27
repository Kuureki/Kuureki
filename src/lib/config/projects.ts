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
      'A roguelike Discord bot with seasonal progression, tower combat, and a growing catalog of game content.',
    fullDesc:
      'Seasonly is a roguelike Discord bot built around seasonal progression and tower combat. Players climb floors, face bosses, and collect gear across seasonal resets that keep the meta fresh.\n\nThe game content catalog is stored in Postgres and loaded at runtime, making events, enemies, items, and bosses easy to tune without redeploying. Combat runs in-memory through a dedicated tower system, with state persisted per session.\n\nAuth is handled via Discord OAuth. It is served by me at seasonly.space — not open source and not self-hostable.',
    tags: ['Rust', 'Discord', 'sqlx', 'PostgreSQL', 'Tower Combat', 'Roguelike'],
    highlights: [
      'Roguelike tower combat with floor-by-floor progression',
      'Seasonal resets that refresh the meta without wiping player identity',
      'Game content catalog in Postgres, tunable without redeploys',
      'Discord OAuth as the sole auth method',
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
      'A realtime WebSocket gateway. Typed pub/sub channels, presence, and multi-transport fallback — served by me.',
    fullDesc:
      'Brume is a realtime WebSocket gateway for teams that need pub/sub infrastructure without the SaaS lock-in. A single Rust binary connects to your existing Postgres database and exposes typed pub/sub channels, presence, and a REST API for server-side publishing.\n\nDefine your event schema once. Messages propagate as fully typed payloads across every client — TypeScript, Python, Go, whatever your stack speaks. The transport layer falls back gracefully: WebSocket → SSE → long-polling for environments where raw sockets are not available.\n\nPricing is flat-rate. No per-connection billing, no scaling surprises. It is served by me at brume.run — not open source and not self-hostable.',
    tags: ['Rust', 'axum', 'tokio', 'WebSocket', 'PostgreSQL LISTEN/NOTIFY', 'TypeScript SDK'],
    highlights: [
      'Single binary — no separate relay process, no dependency on external services',
      'Fully typed event schemas propagate as typed payloads across your entire stack',
      'Presence tracking built in — roster, count, and custom state',
      'Multi-transport fallback chain: WebSocket → SSE → long-polling',
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
