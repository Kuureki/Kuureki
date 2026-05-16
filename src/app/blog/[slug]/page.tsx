import fs from 'node:fs';
import path from 'node:path';

import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { notFound } from 'next/navigation';

import Contact from '@/components/Contact';
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
        <article className="border-border border-b py-[6rem] pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <a
                href="/#writing"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Writing
              </a>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <span className="text-accent/70 font-mono text-[0.62rem] tracking-[0.06em] uppercase">
                {source.frontmatter.category}
              </span>
              <span className="text-text-dim font-mono text-[0.65rem]">·</span>
              <span className="text-text-dim font-mono text-[0.65rem]">
                {source.frontmatter.date}
              </span>
              <span className="text-text-dim font-mono text-[0.65rem]">·</span>
              <span className="text-text-dim font-mono text-[0.65rem]">
                {source.frontmatter.read}
{' '}
read
</span>
            </div>

            <h1 className="text-[clamp(1.8rem, 4vw, 2.5rem)] text-text mb-8 font-serif leading-[1.15] font-normal tracking-[-0.02em]">
              {source.frontmatter.title}
            </h1>

            <div className="blog-content">
              <MDXRemote source={source.body} components={mdxComponents} />
            </div>

            {(prevPost || nextPost) && (
              <div className="border-border xs:grid-cols-1 mt-16 grid grid-cols-2 gap-8 border-t pt-8">
                {prevPost
? (
                  <a href={`/blog/${prevPost.slug}`} className="group no-underline">
                    <div className="text-text-dim mb-1 font-mono text-[0.68rem] tracking-[0.06em] uppercase">
                      Previous
                    </div>
                    <div className="text-text group-hover:text-accent text-[0.95rem] font-medium transition-colors duration-150">
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
                    className="group xs:text-left text-right no-underline"
                  >
                    <div className="text-text-dim mb-1 font-mono text-[0.68rem] tracking-[0.06em] uppercase">
                      Next
                    </div>
                    <div className="text-text group-hover:text-accent text-[0.95rem] font-medium transition-colors duration-150">
                      {nextPost.title}
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
        </article>

        <Contact />
      </main>
      <Footer />
    </>
  );
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="text-text mt-12 mb-4 font-serif text-[1.5rem] leading-[1.2] font-normal tracking-[-0.02em]"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="text-text mt-10 mb-3 text-[1.1rem] font-medium" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="text-text-muted mb-6 text-[0.925rem] leading-[1.75] last:mb-0" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-6 flex list-none flex-col gap-2 pl-0" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-6 flex flex-col gap-2 pl-6" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className="text-text-muted flex items-start gap-3 text-[0.925rem] leading-[1.75]"
    >
      <span className="text-text-dim mt-[0.15rem] flex-shrink-0 font-mono text-[0.75rem]">—</span>
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
          className="text-accent bg-bg-3 border-border rounded border px-[0.35rem] py-[0.15rem] font-mono text-[0.825rem] [pre_&]:rounded-none [pre_&]:border-none [pre_&]:bg-transparent [pre_&]:p-0"
        >
          {children}
        </code>
      );
    }
    return (
      <code {...rest} className={className}>
        {children}
      </code>
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="bg-bg-2 border-border mb-6 overflow-x-auto rounded-[10px] border p-4"
    >
      {props.children}
    </pre>
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-[0.875rem]" />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="text-text-dim border-border border-b px-4 py-3 text-left font-mono text-[0.75rem] tracking-[0.06em] uppercase"
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="text-text-muted border-border/50 border-b px-4 py-3 text-[0.875rem]"
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="text-text font-medium" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="text-text-muted italic" />
  ),
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-accent border-accent/30 hover:border-accent border-b no-underline transition-colors duration-150"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="border-accent/30 text-text-muted mb-6 border-l-2 py-2 pl-4 italic"
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr {...props} className="border-border my-8" />
  ),
};
