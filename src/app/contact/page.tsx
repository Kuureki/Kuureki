import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionHeader from '@/components/SectionHeader';
import { SITE, SOCIALS } from '@/lib/config';

export const metadata: Metadata = {
  title: `Contact — ${SITE.name}`,
  description: 'Get in touch. Collaborate or discuss ideas.',
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
      description: 'Quick thoughts and updates',
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
      description: 'Hang out, chat, or discuss projects',
    },
  ];

  const openTo = [
    'Collaborations on anime-themed products',
    'Feedback on Megami or Seasonly',
    'Discussions about gacha mechanics and player economies',
    'Fantasy sports and prediction market design',
    'Technical architecture and systems engineering',
  ];

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

            <SectionHeader
              title="Let's talk"
              subtitle="If you have an idea, want to collaborate, or just want to talk about anime culture, gacha economies, fantasy sports, or distributed systems — reach out."
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[10px] border border-border bg-bg-2 px-[1.4rem] py-[1.3rem] no-underline transition-all duration-150 hover:border-border-hover"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[0.95rem] font-medium text-text">{link.label}</span>
                    <span className="font-mono text-[0.72rem] text-text-dim transition-colors duration-150 group-hover:text-accent">
                      {link.handle}
                      {' '}
                      →
                    </span>
                  </div>
                  <p className="text-[0.78rem] text-text-dim">{link.description}</p>
                </a>
              ))}
            </div>

            <div className="mt-16 rounded-[10px] border border-border bg-bg-2 px-[1.6rem] py-[1.6rem]">
              <h3 className="mb-3 font-serif text-[1.1rem] text-text">Open to</h3>
              <div className="flex flex-col gap-3">
                {openTo.map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-[0.05rem] flex-shrink-0 font-mono text-[0.75rem] text-accent">→</span>
                    <p className="text-[0.85rem] leading-[1.6] text-text-muted">{item}</p>
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
