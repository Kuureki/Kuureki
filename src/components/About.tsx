'use client';

import { useEffect, useRef } from 'react';

import SectionHeader from '@/components/SectionHeader';
import { ABOUT_CARDS } from '@/lib/config';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el)
      return;
    el.classList.add('fade-in');
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
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="border-border border-b py-20">
      <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
        <div ref={ref} className="fade-in">
          <SectionHeader
            title="What I'm about"
            subtitle="The thinking behind the projects and how I approach building."
            action={{ label: 'Read more', href: '/about' }}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ABOUT_CARDS.map(card => (
              <div
                key={card.title}
                className="border-border bg-bg-2 hover:border-border-hover rounded-[10px] border px-[1.4rem] py-[1.25rem] transition-colors duration-200"
              >
                <h4 className="text-text mb-2 text-[0.85rem] font-medium tracking-[0.01em]">
                  {card.title}
                </h4>
                <p className="text-text-muted text-[0.825rem] leading-[1.65]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
