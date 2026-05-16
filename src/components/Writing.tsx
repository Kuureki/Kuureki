'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { BlogMeta } from '@/lib/blog';

export default function Writing({ posts }: { posts: BlogMeta[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    if (ref.current) 
observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="writing" className="border-border border-b py-20">
      <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
        <div ref={ref} className="fade-in">
          <div className="mb-[2.5rem]">
            <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
              05 — Writing
            </div>
            <h2 className="text-text font-serif text-[1.9rem] leading-[1.2] font-normal tracking-[-0.02em]">
              Notes from the work.
            </h2>
            <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
              Things I figured out the hard way, written down so I don&apos;t forget.
            </p>
          </div>
          <div className="flex flex-col">
            {posts.map((post, idx) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`border-border group xs:flex-col xs:gap-[0.35rem] flex items-start gap-6 border-b py-[1.2rem] no-underline transition-all duration-150 ${idx === 0 ? 'border-border border-t' : ''}`}
              >
                <div className="xs:flex-row xs:gap-3 xs:w-auto flex w-20 flex-shrink-0 flex-col gap-1 pt-[0.15rem]">
                  <span className="text-text-dim font-mono text-[0.65rem]">{post.date}</span>
                  <span className="text-text-dim font-mono text-[0.62rem]">{post.read}</span>
                  <span className="text-accent/70 font-mono text-[0.62rem]">{post.category}</span>
                </div>
                <div className="flex-1">
                  <div className="text-text group-hover:text-accent mb-1 text-[0.93rem] leading-[1.4] font-medium transition-colors duration-150">
                    {post.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
