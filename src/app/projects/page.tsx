import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import { PROJECTS, SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: `Projects — ${SITE.name}`,
  description:
    'Things I\'ve built. Megami, Seasonly, Brume, and other products focused on community and systems.',
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[5rem] pb-[4.5rem] md:py-[6rem] md:pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Back to home
              </a>
            </div>

            <SectionHeader
              title="Things I've built"
              subtitle="Products focused on community, prediction, and infrastructure."
            />

            <div className="flex flex-col gap-[1px]">
              {PROJECTS.map((project, idx) => (
                <ProjectCard key={project.slug} project={project} idx={idx} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
