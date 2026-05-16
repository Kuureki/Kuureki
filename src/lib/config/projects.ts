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
      'Discord anime gacha bot with a full relationship economy. Skins, print numbers, romantic ownership mechanics, steal windows, marriage, legacy children, and a cold-voice drama feed. Real-ESRGAN upscale pipeline.',
    fullDesc:
      'Megami is a Discord anime gacha bot built around a full relationship economy. It goes beyond simple card collection — featuring skins, print numbers, romantic ownership mechanics, steal windows, marriage systems, legacy children, and a cold-voice drama feed.\n\nThe bot was designed by studying existing gacha bot economics (Karuta, Mudae, Gachapon) deeply and asking what a drama-driven relationship economy could look like. Image processing uses a Real-ESRGAN upscale pipeline for high-quality card generation, with napi-rs canvas for performant image rendering.',
    tags: [
      'Discord.js',
      'napi-rs canvas',
      'PostgreSQL',
      'AniList GraphQL',
      'Real-ESRGAN',
      'Cloudflare Workers',
    ],
    highlights: [
      'Full relationship economy with romantic ownership mechanics',
      'Skins and print number rarity system',
      'Steal windows and marriage mechanics',
      'Cold-voice drama feed for community engagement',
      'Real-ESRGAN upscale pipeline for card images',
    ],
    url: 'https://megami.dev',
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
    tags: [
      'Next.js 15',
      'TypeScript',
      'Tailwind v4',
      'Drizzle ORM',
      'PostgreSQL',
      'AniList GraphQL',
    ],
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
