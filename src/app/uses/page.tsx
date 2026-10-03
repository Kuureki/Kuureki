import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionHeader from '@/components/SectionHeader';
import { SITE, USES } from '@/lib/config';

export const metadata: Metadata = {
  title: `Uses — ${SITE.name}`,
  description: 'The hardware, editor setup, and software I actually use day to day.',
};

export default function UsesPage() {
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
              title="Uses"
              subtitle="What I actually open every day, and why. Not a recommendation list, just an honest inventory."
            />

            <div className="flex flex-col gap-6">
              {USES.map(group => (
                <div
                  key={group.title}
                  className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.6rem]"
                >
                  <h3 className="text-text-dim mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                    {group.title}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {group.items.map(item => (
                      <div key={item.name} className="flex flex-col gap-1">
                        <span className="text-text text-[0.9rem] font-medium">{item.name}</span>
                        <span className="text-text-muted text-[0.82rem] leading-[1.6]">
                          {item.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
