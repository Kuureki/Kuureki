'use client';

import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { useEffect, useRef } from 'react';

import SectionHeader from '@/components/SectionHeader';
import { PROJECTS } from '@/lib/config';

export default function ProjectsPreview() {
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
    <section id="projects" className="border-border border-b py-20">
      <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
        <div ref={ref} className="fade-in">
          <SectionHeader
            title="Things I've built"
            action={{ label: 'All projects', href: '/projects' }}
          />

          <div className="flex flex-col gap-[1px]">
            {PROJECTS.slice(0, 3).map((project, idx) => (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`group border-border hover:bg-bg-2/40 border-b py-[1.35rem] no-underline transition-colors duration-150 ${
                  idx === 0 ? 'border-border border-t' : ''
                }`}
              >
                <div className="flex items-start gap-[1.25rem]">
                  <span className="text-text-dim w-6 flex-shrink-0 pt-1 font-mono text-[0.65rem]">
                    {project.num}
                  </span>
                  <div className="flex-1">
                    <div className="mb-[0.3rem] flex items-center justify-between">
                      <span className="text-text group-hover:text-accent text-[0.95rem] font-medium transition-colors duration-150">
                        {project.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.url && (
                          <span
                            className="text-text-dim opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(project.url, '_blank', 'noopener,noreferrer');
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Visit ${project.name}`}
                          >
                            <ExternalLinkIcon className="h-4 w-4" />
                          </span>
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
                      {project.tags.slice(0, 5).map(tag => (
                        <span
                          key={tag}
                          className="border-border bg-bg-3 text-text-dim rounded-sm border px-[0.45rem] py-[0.15rem] font-mono text-[0.65rem] tracking-[0.03em]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
