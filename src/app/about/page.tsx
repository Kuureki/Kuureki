import type { Metadata } from 'next';

import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { ABOUT_CARDS, BADGES, PRINCIPLES, SITE, SOCIALS } from '@/lib/config';

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description: 'Building at the intersection of anime culture and systems engineering.',
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[6rem] pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/#about"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Back to home
              </a>
            </div>

            <div className="mb-4">
              <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
                About
              </div>
              <h1 className="text-[clamp(2rem, 5vw, 3rem)] text-text font-serif leading-[1.1] font-normal tracking-[-0.02em]">
                Who I am.
              </h1>
            </div>

            <p className="text-text-muted mb-12 max-w-[560px] text-[0.95rem] leading-[1.75]">
              Student & indie builder focused on products that are honest, well-crafted, and solve problems that actually exist.
            </p>

            <div className="mb-12 flex flex-wrap gap-2">
              {BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className={`rounded-sm border px-2.5 py-[0.35rem] font-mono text-[0.7rem] ${
                    badge.type === 'green'
                      ? 'border-green/20 text-green'
                      : badge.type === 'violet'
                        ? 'border-accent/20 text-accent'
                        : 'border-border text-text-dim'
                  }`}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="mb-16 grid gap-4 xs:grid-cols-1 md:grid-cols-2">
              {ABOUT_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="border-border hover:border-border-hover rounded-[10px] border bg-bg-2 px-[1.4rem] py-[1.4rem] transition-colors duration-200"
                >
                  <h3 className="text-text mb-2 font-serif text-[1.15rem] leading-[1.3]">
                    {card.title}
                  </h3>
                  <p className="text-text-muted text-[0.85rem] leading-[1.65]">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-bg-2 border-border rounded-[10px] border px-[1.6rem] py-[1.6rem]">
              <h3 className="text-text mb-6 font-mono text-[0.8rem] font-medium tracking-[0.06em] uppercase">
                Working principles
              </h3>
              <div className="flex flex-col gap-4">
                {PRINCIPLES.map((principle, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-accent mt-[0.1rem] flex-shrink-0 font-mono text-[0.75rem]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-text-muted text-[0.875rem] leading-[1.65]">{principle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-border mt-16 border-t pt-12">
              <h3 className="text-text mb-6 font-serif text-[1.3rem]">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'GitHub', href: SOCIALS.github },
                  { label: 'Twitter', href: SOCIALS.twitter },
                  { label: 'Discord', href: SOCIALS.discord },
                  { label: 'Email', href: SOCIALS.email },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border hover:border-border-hover text-text-muted hover:text-text rounded-[8px] border bg-bg-2 px-4 py-2.5 text-[0.825rem] no-underline transition-all duration-150"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
