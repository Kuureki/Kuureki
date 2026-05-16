import type { Metadata } from 'next';
import { ArrowLeftIcon, ExternalLinkIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { notFound } from 'next/navigation';

import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { PROJECTS, getProjectBySlug, SITE } from '@/lib/config';

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.name} — ${SITE.name}`,
    description: project.shortDesc,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;
  const nextProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;

  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[6rem] pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <a
                href="/#projects"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Projects
              </a>
              <span className="text-text-dim font-mono text-[0.65rem]">{project.num}</span>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <h1 className="text-[clamp(2rem, 5vw, 3rem)] text-text font-serif leading-[1.1] font-normal tracking-[-0.02em]">
                {project.name}
              </h1>
              <div className="flex items-center gap-2">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-dim transition-colors duration-150 hover:text-accent"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                )}
                <span
                  className={`flex-shrink-0 rounded-sm border px-2 py-[0.18rem] font-mono text-[0.65rem] ${
                    project.status === 'Active'
                      ? 'border-green/20 text-green'
                      : 'border-border text-text-dim'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            <p className="text-text-muted mb-8 max-w-[560px] text-[0.95rem] leading-[1.75]">
              {project.shortDesc}
            </p>

            <div className="mb-12 flex flex-wrap gap-[0.35rem]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-text-dim bg-bg-3 border-border rounded-sm border px-[0.45rem] py-[0.15rem] font-mono text-[0.65rem] tracking-[0.03em]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-12 inline-flex items-center gap-3 no-underline"
              >
                <div className="bg-text hover:bg-[#d0d0d8] rounded-[9px] px-[1.2rem] py-[0.6rem] text-[0.825rem] font-medium text-bg transition-all duration-150">
                  Visit {project.name}
                </div>
                <div className="text-text-muted group-hover:text-text group-hover:translate-x-0.5 transition-all duration-150">
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </a>
            )}

            <div>
              {project.fullDesc.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="text-text-muted mb-6 text-[0.925rem] leading-[1.75] last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="bg-bg-2 border-border mt-12 rounded-[10px] border px-[1.4rem] py-[1.4rem]">
                <h3 className="text-text mb-[0.85rem] font-mono text-[0.8rem] font-medium tracking-[0.06em] uppercase">
                  Highlights
                </h3>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {project.highlights.map((h) => (
                    <li key={h} className="text-text-muted flex items-start gap-3 text-[0.825rem]">
                      <span className="text-accent mt-[0.05rem] flex-shrink-0 font-mono text-[0.75rem]">
                        →
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(prevProject || nextProject) && (
              <div className="border-border xs:grid-cols-1 mt-12 grid grid-cols-2 gap-8 border-t pt-8">
                {prevProject ? (
                  <a href={`/projects/${prevProject.slug}`} className="group no-underline">
                    <div className="text-text-dim mb-1 font-mono text-[0.68rem] tracking-[0.06em] uppercase">
                      Previous
                    </div>
                    <div className="text-text group-hover:text-accent text-[0.95rem] font-medium transition-colors duration-150">
                      {prevProject.name}
                    </div>
                  </a>
                ) : (
                  <div />
                )}
                {nextProject && (
                  <a
                    href={`/projects/${nextProject.slug}`}
                    className="group xs:text-left text-right no-underline"
                  >
                    <div className="text-text-dim mb-1 font-mono text-[0.68rem] tracking-[0.06em] uppercase">
                      Next
                    </div>
                    <div className="text-text group-hover:text-accent text-[0.95rem] font-medium transition-colors duration-150">
                      {nextProject.name}
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
