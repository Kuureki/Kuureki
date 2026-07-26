import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Kuureki',
  description: 'Student & indie builder. Working on Megami, Seasonly, and Brume.',
  openGraph: {
    title: 'Kuureki',
    description: 'Student & indie builder. Working on Megami, Seasonly, and Brume.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: '\'DM Sans\', system-ui, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
