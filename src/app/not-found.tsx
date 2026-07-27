import type { Metadata } from 'next';

import StatusPage from '@/components/StatusPage';

export const metadata: Metadata = {
  title: 'Page not found — Kuureki',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      eyebrow="Lost in the archive"
      title="This page wandered off."
      description="The link may be outdated, or this page never existed in the first place. Let’s get you somewhere useful."
    />
  );
}
