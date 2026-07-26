import fs from 'node:fs';
import path from 'node:path';

import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { notFound } from 'next/navigation';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { getAllBlogMeta, getBlogSource } from '@/lib/blog';
import { SITE } from '@/lib/config';

export function generateStaticParams() {
  const posts = getAllBlogMeta();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = getBlogSource(slug);
  if (!source)
    return { title: 'Post Not Found' };
  return {
    title: `${source.frontmatter.title} — ${SITE.name}`,
    description: source.frontmatter.category,
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="mb-4 mt-12 font-serif text-[1.5rem] font-normal leading-[1.2] tracking-[-0.02em] text-text"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="mb-3 mt-10 text-[1.1rem] font-medium text-text" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mb-6 text-[0.925rem] leading-[1.75] text-text-muted last:mb-0" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-6 flex list-none flex-col gap-2 pl-0" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-6 flex flex-col gap-2 pl-6" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="flex items-start gap-3 text-[0.925rem] leading-[1.75] text-text-muted">
      <span className="mt-[0.15rem] flex-shrink-0 font-mono text-[0.75rem] text-text-dim">-</span>
      <span>{props.children}</span>
    </li>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const { className, children, ...rest } = props as {
      className?: string;
      children: React.ReactNode;
    };
    const isInline = !className;
    if (isInline) {
      return (
        <code
          {...rest}
          className="rounded border border-border bg-bg-3 px-[0.35rem] py-[0.15rem] font-mono text-[0.825rem] text-accent [pre_&]:rounded-none [pre_&]:border-none [pre_&]:bg-transparent [pre_&]:p-0"
        >
          {children}
        </code>
      );
    }
    return <code {...rest} className={className}>{children}</code>;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className="mb-6 overflow-x-auto rounded-[10px] border border-border bg-bg-2 p-4" />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-[0.875rem]" />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border-b border-border px-4 py-3 text-left font-mono text-[0.75rem] uppercase tracking-[0.06em] text-text-dim"
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} className="border-b border-border/50 px-4 py-3 text-[0.875rem] text-text-muted" />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-medium text-text" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic text-text-muted" />
  ),
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="border-b border-accent/30 text-accent no-underline transition-colors duration-150 hover:border-accent"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="mb-6 border-l-2 border-accent/30 py-2 pl-4 italic text-text-muted"
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr {...props} className="my-8 border-border" />
  ),
};

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = getBlogSource(slug);
  if (!source)
    notFound();

  const allPosts = getAllBlogMeta();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <>
      <Nav />
      <main className="pt-6">
        <article className="border-b border-border py-[5rem] pb-[4.5rem] md:py-[6rem] md:pb-[5rem]">
          <div className="mx-auto max-w-[740px] px-6 xs:px-[1.1rem]">
            <div className="mb-6 flex items-center gap-3">
              <a
                href="/blog"
                className="font-mono text-[0.75rem] text-text-dim no-underline transition-colors duration-150 hover:text-text"
              >
                ← Writing
              </a>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.06em] text-accent/70">
                {source.frontmatter.category}
              </span>
              <span className="font-mono text-[0.65rem] text-text-dim">·</span>
              <span className="font-mono text-[0.65rem] text-text-dim">{source.frontmatter.date}</span>
              <span className="font-mono text-[0.65rem] text-text-dim">·</span>
              <span className="font-mono text-[0.65rem] text-text-dim">
                {source.frontmatter.read}
                {' '}
                read
              </span>
            </div>

            <h1 className="mb-8 font-serif text-[clamp(1.8rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-text">
              {source.frontmatter.title}
            </h1>

            <div className="blog-content">
              <MDXRemote source={source.body} components={mdxComponents} />
            </div>

            {(prevPost || nextPost) && (
              <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 xs:grid-cols-1">
                {prevPost
                  ? (
                      <a href={`/blog/${prevPost.slug}`} className="group no-underline">
                        <div className="mb-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-text-dim">
                      Previous
                        </div>
                        <div className="text-[0.95rem] font-medium text-text transition-colors duration-150 group-hover:text-accent">
                          {prevPost.title}
                        </div>
                      </a>
                    )
                  : (
                      <div />
                    )}
                {nextPost && (
                  <a
                    href={`/blog/${nextPost.slug}`}
                    className="group text-right no-underline xs:text-left"
                  >
                    <div className="mb-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-text-dim">
                      Next
                    </div>
                    <div className="text-[0.95rem] font-medium text-text transition-colors duration-150 group-hover:text-accent">
                      {nextPost.title}
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
