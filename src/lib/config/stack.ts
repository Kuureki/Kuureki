export interface StackGroup {
  title: string;
  items: string[];
}

export const STACK: StackGroup[] = [
  {
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Rust', 'Python', 'SQL', 'Bash'],
  },
  {
    title: 'Frontend & Desktop',
    items: ['Next.js', 'Tanstack Start', 'Tauri', 'React', 'Tailwind v4'],
  },
  {
    title: 'Backend & Data',
    items: ['Bun', 'PostgreSQL', 'pgvector', 'Drizzle ORM', 'Prisma', 'Redis'],
  },
  {
    title: 'Infrastructure',
    items: ['Docker', 'Cloudflare Workers', 'Cloudflare Tunnel', 'B2'],
  },
  {
    title: 'AI / ML',
    items: ['Vercel AI SDK', 'OpenRouter', 'Real-ESRGAN', 'PaddleOCR'],
  },
];

export const STACK_NOTES = [
  {
    title: 'Lean by default',
    desc: 'I reach for the smallest stack that can carry the product. Every dependency is a liability until it proves otherwise.',
  },
  {
    title: 'Type safety everywhere',
    desc: 'From TypeScript to Rust to Drizzle — I prefer contracts that the compiler can check over documentation that goes stale.',
  },
  {
    title: 'Own the runtime',
    desc: 'Flat-rate pricing and no surprise scaling bills. That is the Brume philosophy, and it shapes how I choose every tool.',
  },
];
