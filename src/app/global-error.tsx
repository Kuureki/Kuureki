'use client';

import { useEffect } from 'react';

import StatusPage from '@/components/StatusPage';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development')
      console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: '#0c0c0e', color: '#f1f1f3' }}>
        <StatusPage
          code="500"
          eyebrow="System unavailable"
          title="The whole page needs a reset."
          description="Something unexpected happened before the site could load. Try again, or return to the home page."
          action="Try again"
          href=""
          onAction={reset}
        />
      </body>
    </html>
  );
}
