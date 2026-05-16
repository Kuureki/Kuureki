'use client';

import { useEffect, useRef } from 'react';

import { ABOUT_CARDS, PRINCIPLES } from '@/lib/config';

export default function About() {
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

  return (
    <section id="about" className="border-border border-b py-20">
      <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
        <div ref={ref} className="fade-in">
          <div className="mb-[2.5rem]">
            <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
              01 — About
            </div>
            <h2 className="text-text font-serif text-[1.9rem] leading-[1.2] font-normal tracking-[-0.02em]">
              What I&apos;m about.
            </h2>
            <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
              The thinking behind the projects and how I approach building.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ABOUT_CARDS.map(card => (
              <div
                key={card.title}
                className="bg-bg-2 border-border hover:border-border-hover rounded-[10px] border px-[1.4rem] py-[1.25rem] transition-colors duration-200"
              >
                <h4 className="text-text mb-2 text-[0.8rem] font-medium tracking-[0.01em]">
                  {card.title}
                </h4>
                <p className="text-text-muted text-[0.825rem] leading-[1.65]">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-bg-2 border-border mt-8 rounded-[10px] border px-[1.4rem] py-[1.4rem]">
            <h4 className="text-text mb-[0.85rem] font-mono text-[0.8rem] font-medium tracking-[0.06em] uppercase">
              Working principles
            </h4>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {PRINCIPLES.map(p => (
                <li key={p} className="text-text-muted flex items-start gap-3 text-[0.825rem]">
                  <span className="text-text-dim mt-[0.05rem] flex-shrink-0 font-mono text-[0.75rem]">
                    —
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
