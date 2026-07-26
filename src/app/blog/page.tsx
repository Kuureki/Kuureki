import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionHeader from '@/components/SectionHeader';
import WritingItem from '@/components/WritingItem';
import { getAllBlogMeta } from '@/lib/blog';
import { SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: `Writing — ${SITE.name}`,
  description:
    'Engineering blog. Deep dives into architecture, product decisions, and technical challenges.',
};

export default function BlogIndexPage() {
  const posts = getAllBlogMeta();

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
              title="Engineering blog"
              subtitle="Deep dives into architecture, product decisions, and technical challenges."
            />

            <div className="flex flex-col">
              {posts.map((post, idx) => (
                <WritingItem key={post.slug} post={post} idx={idx} />
              ))}
            </div>

            {posts.length === 0 && (
              <div className="border-border bg-bg-2 rounded-[10px] border p-6">
                <div className="text-text-muted text-[0.875rem]">
                  No posts yet. Check back soon.
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
