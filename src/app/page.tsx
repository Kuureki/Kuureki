import type { Metadata } from 'next';

import About from '@/components/About';
import ActivitySection from '@/components/ActivitySection';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { LanyardProvider } from '@/components/LanyardProvider';
import Nav from '@/components/Nav';
import ProjectsPreview from '@/components/ProjectsPreview';
import WritingPreview from '@/components/WritingPreview';
import { getAllBlogMeta } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Kuureki',
  description:
    'Student and indie builder. Building Seasonly, a roguelike that runs inside Discord, and Brume, a rate-limiting API in Rust.',
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
        <ActivitySection />
        <WritingPreview posts={posts} />
      </main>
      <Footer />
    </LanyardProvider>
  );
}
