import type { Metadata } from 'next';

import { SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: `Studio — ${SITE.name}`,
  description: 'The oneko cat that follows your cursor around this site. Pick a skin.',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
