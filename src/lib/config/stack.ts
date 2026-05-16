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
