import type { Metadata } from 'next';

import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { PROJECTS, SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: `Projects — ${SITE.name}`,
  description: 'Things I\'ve built. Two products, one focused on anime culture, the other on competitive seasonal prediction.',
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[6rem] pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/#projects"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Back to home
              </a>
            </div>

            <div className="mb-4">
              <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
                02 — Projects
              </div>
              <h1 className="text-[clamp(2rem, 5vw, 3rem)] text-text font-serif leading-[1.1] font-normal tracking-[-0.02em]">
                Things I&apos;ve built.
              </h1>
              <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
                Two products, one focused on anime culture, the other on competitive seasonal prediction.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-[1px]">
              {PROJECTS.map((project, idx) => (
                <a
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`border-border group border-b py-[1.5rem] no-underline transition-colors duration-150 hover:bg-bg-2/40 ${idx === 0 ? 'border-border border-t' : ''}`}
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
                            <span className="text-text-dim opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-[2] fill-none">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                              </svg>
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
                </a>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
