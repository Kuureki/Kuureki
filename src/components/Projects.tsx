'use client';

import { useEffect, useRef } from 'react';

import { PROJECTS } from '@/lib/config';

export default function Projects() {
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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="border-border border-b py-20">
      <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
        <div ref={ref} className="fade-in">
          <div className="mb-[2.5rem]">
            <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
              02 — Projects
            </div>
            <h2 className="text-text font-serif text-[1.9rem] leading-[1.2] font-normal tracking-[-0.02em]">
              Things I&apos;ve built.
            </h2>
            <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
              Two products, one focused on anime culture, the other on competitive seasonal prediction.
            </p>
          </div>
          <div className="flex flex-col gap-[1px]">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.slug}
                className={`border-border cursor-pointer border-b py-[1.35rem] transition-colors duration-150 hover:bg-bg-2/30 ${idx === 0 ? 'border-border border-t' : ''}`}
                onClick={() => {
                  window.location.href = `/projects/${project.slug}`;
                }}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.location.href = `/projects/${project.slug}`;
                  }
                }}
              >
                <div className="flex items-start gap-[1.25rem]">
                  <span className="text-text-dim w-6 flex-shrink-0 pt-1 font-mono text-[0.65rem]">
                    {project.num}
                  </span>
                  <div className="flex-1">
                    <div className="mb-[0.3rem] flex items-center justify-between">
                      <span className="text-text hover:text-accent text-[0.95rem] font-medium transition-colors duration-150">
                        {project.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.url && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.url, '_blank', 'noopener,noreferrer');
                            }}
                            className="text-text-dim transition-colors duration-150 hover:text-accent"
                            aria-label={`Visit ${project.name} website`}
                          >
                            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-[2] fill-none">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                            </svg>
                          </button>
                        )}
                        <span
                          className={`rounded-sm border px-2 py-[0.18rem] font-mono text-[0.65rem] ${
                            project.status === 'Active'
                              ? 'border-green/20 text-green'
                              : 'border-border text-text-dim'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-text-muted mb-[0.65rem] text-[0.84rem] leading-[1.6]">
                      {project.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-[0.35rem]">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-text-dim bg-bg-3 border-border rounded-sm border px-[0.45rem] py-[0.15rem] font-mono text-[0.65rem] tracking-[0.03em]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
