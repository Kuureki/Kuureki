import type { Metadata } from 'next';

import { SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: `Activity — ${SITE.name}`,
  description:
    'Live Discord presence, GitHub commits, and whatever anime I am watching this season.',
};

export default function ActivityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
