import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { SITE, SOCIALS } from '@/lib/config';

export const metadata: Metadata = {
  title: `Contact — ${SITE.name}`,
  description: 'Get in touch. Collaborate, discuss ideas, or just talk about anime.',
};

export default function ContactPage() {
  const links = [
    {
      label: 'Email',
      handle: SITE.email,
      href: SOCIALS.email,
      description: 'Best for detailed messages and collaborations',
    },
    {
      label: 'X / Twitter',
      handle: '@Kuureki',
      href: SOCIALS.twitter,
      description: 'Quick thoughts, updates, and anime hot takes',
    },
    {
      label: 'GitHub',
      handle: 'github.com/Kuureki',
      href: SOCIALS.github,
      description: 'Open source projects and code',
    },
    {
      label: 'Discord',
      handle: 'Kuureki',
      href: SOCIALS.discord,
      description: 'Hang out, chat about anime, or discuss projects',
    },
  ];

  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[6rem] pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/#contact"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Back to home
              </a>
            </div>

            <div className="mb-4">
              <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
                Contact
              </div>
              <h1 className="text-[clamp(2rem, 5vw, 3rem)] text-text font-serif leading-[1.1] font-normal tracking-[-0.02em]">
                Let&apos;s talk.
              </h1>
              <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
                If you have an idea, want to collaborate, or just want to talk about anime culture,
                gacha economies, fantasy sports, or distributed systems — reach out.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border hover:border-border-hover group rounded-[10px] border bg-bg-2 px-[1.4rem] py-[1.3rem] no-underline transition-all duration-150"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-text text-[0.95rem] font-medium">{link.label}</span>
                    <span className="text-text-dim group-hover:text-accent font-mono text-[0.72rem] transition-colors duration-150">
                      {link.handle}
{' '}
→
</span>
                  </div>
                  <p className="text-text-dim text-[0.78rem]">{link.description}</p>
                </a>
              ))}
            </div>

            <div className="border-border mt-16 rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]">
              <h3 className="text-text mb-3 font-serif text-[1.1rem]">Open to</h3>
              <div className="flex flex-col gap-3">
                {[
                  'Collaborations on anime-themed products',
                  'Feedback on Megami or Seasonly',
                  'Discussions about gacha mechanics and player economies',
                  'Fantasy sports and prediction market design',
                  'Technical architecture and systems engineering',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-accent mt-[0.05rem] flex-shrink-0 font-mono text-[0.75rem]">
                      →
                    </span>
                    <p className="text-text-muted text-[0.85rem] leading-[1.6]">{item}</p>
                  </div>
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
