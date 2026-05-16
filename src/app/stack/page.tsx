import type { Metadata } from 'next';

import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { SITE, STACK } from '@/lib/config';

export const metadata: Metadata = {
  title: `Stack — ${SITE.name}`,
  description: 'Technologies and tools I use to build products.',
};

export default function StackPage() {
  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[6rem] pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/#stack"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Back to home
              </a>
            </div>

            <div className="mb-4">
              <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
                Stack
              </div>
              <h1 className="text-[clamp(2rem, 5vw, 3rem)] text-text font-serif leading-[1.1] font-normal tracking-[-0.02em]">
                Tools I use.
              </h1>
              <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
                Technologies and tools I use to build products.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-6">
              {STACK.map((group) => (
                <div
                  key={group.title}
                  className="border-border rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]"
                >
                  <h3 className="text-text-dim mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="border-border hover:border-border-hover text-text rounded-sm border bg-bg-3 px-3 py-[0.35rem] font-mono text-[0.75rem] tracking-[0.03em] transition-colors duration-150"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-border mt-12 rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]">
              <h3 className="text-text mb-3 font-serif text-[1.1rem]">Philosophy</h3>
              <p className="text-text-muted text-[0.875rem] leading-[1.65]">
                I prefer lean, well-documented tools that get out of the way. The stack above is what I reach for when building products that need to ship fast and scale gracefully. I&apos;m always evaluating new tools, but these have proven reliable across multiple projects.
              </p>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
