import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionHeader from '@/components/SectionHeader';
import { SITE, STACK, STACK_NOTES } from '@/lib/config';

export const metadata: Metadata = {
  title: `Stack — ${SITE.name}`,
  description: 'Technologies and tools I use to build products.',
};

export default function StackPage() {
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
              title="Tools I use"
              subtitle="Technologies and tools I reach for when building products that need to ship fast and scale gracefully."
            />

            <div className="flex flex-col gap-6">
              {STACK.map(group => (
                <div
                  key={group.title}
                  className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.6rem]"
                >
                  <h3 className="text-text-dim mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span
                        key={item}
                        className="border-border bg-bg-3 text-text hover:border-border-hover rounded-sm border px-3 py-[0.35rem] font-mono text-[0.75rem] tracking-[0.03em] transition-colors duration-150"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {STACK_NOTES.map(note => (
                <div
                  key={note.title}
                  className="border-border bg-bg-2 rounded-[10px] border px-[1.4rem] py-[1.4rem]"
                >
                  <h3 className="text-text mb-2 font-serif text-[1.05rem]">{note.title}</h3>
                  <p className="text-text-muted text-[0.82rem] leading-[1.65]">{note.desc}</p>
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
