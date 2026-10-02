import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionHeader from '@/components/SectionHeader';
import { NOW_UPDATED, SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: `Now — ${SITE.name}`,
  description: 'What I am doing right now, updated when it changes.',
};

const NOW = [
  {
    label: 'Building',
    text: 'Seasonly is the priority. Most of my time goes to the guarded write vocabulary, the part that keeps an LLM from touching the Discord API without a human saying yes.',
  },
  {
    label: 'Shipping',
    text: 'Brume is live and flat-rate. I am slowly replacing the SDK timeout fallback with something I trust more than a retry loop.',
  },
  {
    label: 'Watching',
    text: 'Whatever anime is in season. The favourites on my home page are live from AniList, and the quotes there are a fair sample of my taste.',
  },
  {
    label: 'Reading',
    text: 'A Philosophy of Software Design, again. The chapter on deep modules keeps recontextualizing decisions I made months ago.',
  },
];

export default function NowPage() {
  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[5rem] pb-[4.5rem] md:py-[6rem] md:pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Back to home
              </a>
            </div>

            <SectionHeader
              title="Now"
              subtitle="What I am doing right now. Updated when it changes, not on a schedule."
            />

            <div className="flex flex-col gap-4">
              {NOW.map(item => (
                <div
                  key={item.label}
                  className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.4rem]"
                >
                  <h3 className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                    {item.label}
                  </h3>
                  <p className="text-text-muted text-[0.875rem] leading-[1.65]">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="text-text-dim mt-10 font-mono text-[0.72rem]">
              Last updated
              {' '}
              {NOW_UPDATED}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
