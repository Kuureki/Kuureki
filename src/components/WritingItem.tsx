import Link from 'next/link';

import { BlogMeta } from '@/lib/blog';

interface WritingItemProps {
  post: BlogMeta;
  idx?: number;
  showCategory?: boolean;
}

export default function WritingItem({ post, idx = 0, showCategory = true }: WritingItemProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group border-border xs:flex-col xs:gap-[0.35rem] flex items-start gap-6 border-b py-[1.2rem] no-underline transition-all duration-150 ${
        idx === 0 ? 'border-border border-t' : ''
      }`}
    >
      <div className="xs:w-auto xs:flex-row xs:gap-3 flex w-20 flex-shrink-0 flex-col gap-1 pt-[0.15rem]">
        <span className="text-text-dim font-mono text-[0.65rem]">{post.date}</span>
        <span className="text-text-dim font-mono text-[0.62rem]">{post.read}</span>
        {showCategory && (
          <span className="text-accent/70 font-mono text-[0.62rem]">{post.category}</span>
        )}
      </div>
      <div className="flex-1">
        <div className="text-text group-hover:text-accent mb-1 text-[0.93rem] leading-[1.4] font-medium transition-colors duration-150">
          {post.title}
        </div>
      </div>
    </Link>
  );
}
