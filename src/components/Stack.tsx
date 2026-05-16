'use client';

import { useEffect, useRef } from 'react';

import { STACK } from '@/lib/config';

export default function Stack() {
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
    <section id="stack" className="border-border border-b py-20">
      <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
        <div ref={ref} className="fade-in">
          <div className="mb-[2.5rem]">
            <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
              04 — Stack
            </div>
            <h2 className="text-text font-serif text-[1.9rem] leading-[1.2] font-normal tracking-[-0.02em]">
              Tools I reach for.
            </h2>
            <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
              What&apos;s running under the projects.
            </p>
          </div>
          <div className="xs:gap-4 flex flex-col gap-6">
            {STACK.map(group => (
              <div key={group.title}>
                <h4 className="text-text-dim mb-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-[0.4rem]">
                  {group.items.map(item => (
                    <span
                      key={item}
                      className="text-text-muted border-border bg-bg-2 hover:text-text hover:border-border-hover cursor-default rounded border px-[0.7rem] py-[0.3rem] text-[0.78rem] font-medium transition-all duration-150"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
