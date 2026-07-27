'use client';

import { useEffect } from 'react';

import StatusPage from '@/components/StatusPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep this boundary quiet in production while still surfacing errors locally.
    if (process.env.NODE_ENV === 'development')
      console.error('Application error:', error);
  }, []);

  return (
    <StatusPage
      code="500"
      eyebrow="Something broke"
      title="The page hit a rough edge."
      description="An unexpected error interrupted this page. Try loading it again, or head back home while it sorts itself out."
      action="Try again"
      href=""
      onAction={reset}
    />
  );
}
