import About from '@/components/About';
import Activity from '@/components/Activity';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { LanyardProvider } from '@/components/LanyardProvider';
import Nav from '@/components/Nav';
import Projects from '@/components/Projects';
import Stack from '@/components/Stack';
import Writing from '@/components/Writing';
import { getAllBlogMeta } from '@/lib/blog';

export default function Home() {
  const posts = getAllBlogMeta();

  return (
    <LanyardProvider>
      <Nav />
      <main className="pt-6">
        <Hero />
        <About />
        <Projects />
        <Activity />
        <Stack />
        <Writing posts={posts} />
        <Contact />
      </main>
      <Footer />
    </LanyardProvider>
  );
}
