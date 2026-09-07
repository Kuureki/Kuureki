import type { Metadata } from 'next';

import About from '@/components/About';
import ActivityPreview from '@/components/ActivityPreview';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { LanyardProvider } from '@/components/LanyardProvider';
import Nav from '@/components/Nav';
import ProjectsPreview from '@/components/ProjectsPreview';
import WritingPreview from '@/components/WritingPreview';
import { getAllBlogMeta } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Kuureki',
  description: 'Student & indie builder. Working on Seasonly and Brume.',
};

export default function Home() {
  const posts = getAllBlogMeta().slice(0, 3);

  return (
    <LanyardProvider>
      <Nav />
      <main className="pt-6">
        <Hero />
        <About />
        <ProjectsPreview />
        <ActivityPreview />
        <WritingPreview posts={posts} />
      </main>
      <Footer />
    </LanyardProvider>
  );
}
