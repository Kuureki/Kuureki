'use client';

import { useEffect, useRef } from 'react';

import { SITE, SOCIALS } from '@/lib/config';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    if (ref.current) 
observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const links = [
    { label: 'Email', handle: `${SITE.email} →`, href: SOCIALS.email },
    { label: 'X / Twitter', handle: '@Kuureki →', href: SOCIALS.twitter },
    { label: 'GitHub', handle: 'github.com/Kuureki →', href: SOCIALS.github },
    { label: 'Discord', handle: 'Kuureki →', href: SOCIALS.discord },
  ];

  return (
    <section id="contact" className="border-border border-b py-20 pb-24">
      <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
        <div ref={ref} className="fade-in">
          <div className="mb-[2.5rem]">
            <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
              06 — Contact
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-text mb-3 font-serif text-[1.6rem] leading-[1.2] font-normal tracking-[-0.02em]">
                Let&apos;s talk.
              </h3>
              <p className="text-text-muted text-[0.875rem] leading-[1.7]">
                If you have an idea, want to collaborate, or just want to talk about anime culture,
                gacha economies, fantasy sports, or distributed systems — reach out. I&apos;m always
                interested in good conversations.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="bg-bg-2 border-border hover:border-border-hover hover:bg-bg-3 flex items-center justify-between rounded-lg border px-4 py-[0.85rem] no-underline transition-all duration-150"
                >
                  <span className="text-text text-[0.825rem] font-medium">{link.label}</span>
                  <span className="text-text-dim font-mono text-[0.72rem]">{link.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
