import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionHeader from '@/components/SectionHeader';
import { ABOUT_CARDS, PRINCIPLES, SITE, SOCIALS } from '@/lib/config';

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description: SITE.longBio,
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-b border-border py-[5rem] pb-[4.5rem] md:py-[6rem] md:pb-[5rem]">
          <div className="mx-auto max-w-[740px] px-6 xs:px-[1.1rem]">
            <div className="mb-6">
              <a
                href="/"
                className="font-mono text-[0.75rem] text-text-dim no-underline transition-colors duration-150 hover:text-text"
              >
                ← Back to home
              </a>
            </div>

            <SectionHeader title="Who I am" />

            <p className="mb-12 max-w-[580px] text-[0.95rem] leading-[1.75] text-text-muted">
              {SITE.longBio}
            </p>

            <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {ABOUT_CARDS.map(card => (
                <div
                  key={card.title}
                  className="rounded-[10px] border border-border bg-bg-2 px-[1.4rem] py-[1.25rem] transition-colors duration-200 hover:border-border-hover"
                >
                  <h3 className="mb-2 font-serif text-[1.15rem] leading-[1.3] text-text">{card.title}</h3>
                  <p className="text-[0.85rem] leading-[1.65] text-text-muted">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[10px] border border-border bg-bg-2 px-[1.6rem] py-[1.6rem]">
              <h3 className="mb-6 font-mono text-[0.8rem] font-medium uppercase tracking-[0.06em] text-text">
                Working principles
              </h3>
              <div className="flex flex-col gap-4">
                {PRINCIPLES.map((principle, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="mt-[0.1rem] flex-shrink-0 font-mono text-[0.75rem] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[0.875rem] leading-[1.65] text-text-muted">{principle.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 border-t border-border pt-12">
              <h3 className="mb-6 font-serif text-[1.3rem] text-text">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'GitHub', href: SOCIALS.github },
                  { label: 'Twitter', href: SOCIALS.twitter },
                  { label: 'Discord', href: SOCIALS.discord },
                  { label: 'Email', href: SOCIALS.email },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[8px] border border-border bg-bg-2 px-4 py-2.5 text-[0.825rem] text-text-muted no-underline transition-all duration-150 hover:border-border-hover hover:bg-bg-3 hover:text-text"
                  >
                    {link.label}
                    {' '}
                    →
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
