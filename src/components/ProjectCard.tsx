'use client';

import { ExternalLinkIcon } from '@radix-ui/react-icons';

import { Project } from '@/lib/config';

interface ProjectCardProps {
  project: Project;
  idx?: number;
}

export default function ProjectCard({ project, idx = 0 }: ProjectCardProps) {
  return (
    <a
      href={`/projects/${project.slug}`}
      className={`group border-border hover:bg-bg-2/40 border-b py-[1.5rem] no-underline transition-colors duration-150 ${
        idx === 0 ? 'border-border border-t' : ''
      }`}
    >
      <div className="flex items-start gap-[1.25rem]">
        <span className="text-text-dim w-6 flex-shrink-0 pt-1 font-mono text-[0.65rem]">
          {project.num}
        </span>
        <div className="flex-1">
          <div className="mb-[0.3rem] flex items-center justify-between">
            <span className="text-text group-hover:text-accent text-[1.05rem] font-medium transition-colors duration-150">
              {project.name}
            </span>
            <div className="flex items-center gap-2">
              {project.url && (
                <button
                  type="button"
                  className="text-text-dim opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.url, '_blank', 'noopener,noreferrer');
                  }}
                  aria-label={`Visit ${project.name}`}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
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
            {project.tags.map((tag: string) => (
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
  );
}
