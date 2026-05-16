export interface AboutCard {
  title: string;
  desc: string;
}

export const ABOUT_CARDS: AboutCard[] = [
  {
    title: 'Anime × Systems',
    desc: 'I build products that take anime culture seriously — not as a niche, but as a domain with real engineering challenges. Gacha bot economies, seasonal draft scoring, AniList data pipelines. The problems are interesting because the domain is deep.',
  },
  {
    title: 'Quality-first indie',
    desc: 'Seasonly exists because MAL FAL has an active user base but zero design investment and broken onboarding. Megami exists because Karuta and Mudae leave drama on the table. I build replacements, not clones.',
  },
  {
    title: 'Lean infrastructure',
    desc: 'Everything runs on tight budgets — Cloudflare Workers, Hetzner VPS, Docker, Postgres with pgvector. No cloud bill bloat. The constraint forces better architecture decisions.',
  },
  {
    title: 'Data ownership',
    desc: 'Seasonly stores no anime metadata — everything is fetched real-time from AniList at request time. Megami\'s image pipeline processes on-demand. I think carefully about what data should persist and what should be ephemeral.',
  },
];

export const PRINCIPLES = [
  'Build replacements, not clones — find the gap in existing tools and ship something better.',
  'Privacy is a feature, not a compliance checkbox.',
  'Ship a working version before optimising the architecture.',
  'Study the domain deeply — gacha economics, fantasy sports scoring, distributed systems — before touching code.',
  'Treat anime culture as a serious engineering domain, not a hobby.',
];
