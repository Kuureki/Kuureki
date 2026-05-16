import type { Metadata } from 'next';
import Link from 'next/link';

import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { getAllBlogMeta } from '@/lib/blog';
import { SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: `Writing — ${SITE.name}`,
  description: 'Engineering blog. Deep dives into architecture, product decisions, and technical challenges.',
};

export default function BlogIndexPage() {
  const posts = getAllBlogMeta();

  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[6rem] pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/#writing"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Back to home
              </a>
            </div>

            <div className="mb-4">
              <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
                Writing
              </div>
              <h1 className="text-[clamp(2rem, 5vw, 3rem)] text-text font-serif leading-[1.1] font-normal tracking-[-0.02em]">
                Engineering blog.
              </h1>
              <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
                Deep dives into architecture, product decisions, and technical challenges.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-[1px]">
              {posts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`border-border group border-b py-[1.5rem] no-underline transition-colors duration-150 hover:bg-bg-2/40 ${idx === 0 ? 'border-border border-t' : ''}`}
                >
                  <div className="flex items-start gap-[1.25rem]">
                    <div className="flex-1">
                      <div className="mb-[0.3rem] flex items-center justify-between">
                        <span className="text-text group-hover:text-accent text-[1.05rem] font-medium transition-colors duration-150">
                          {post.title}
                        </span>
                        <span className="text-text-dim font-mono text-[0.65rem]">
                          {post.read}
                        </span>
                      </div>
                      <div className="text-text-dim mb-[0.5rem] flex items-center gap-2 text-[0.75rem]">
                        <span>{post.date}</span>
                        <span className="text-border">·</span>
                        <span className="rounded-sm border border-border px-1.5 py-[0.1rem] font-mono text-[0.6rem]">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="border-border mt-8 rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]">
                <div className="text-text-dim text-[0.875rem]">
                  No posts yet. Check back soon.
                </div>
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
