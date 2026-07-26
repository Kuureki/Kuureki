'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface ActivityCardProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ActivityCard({ label, icon, children, className }: ActivityCardProps) {
  return (
    <div
      className={cn(
        'rounded-[10px] border border-border bg-bg-2 px-[1.6rem] py-[1.4rem]',
        className,
      )}
    >
      <div className="text-text-dim mb-3 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
        {icon && <span className="text-text-muted">{icon}</span>}
        {label}
      </div>
      {children}
    </div>
  );
}

export function ActivityGrid({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el)
      return;
    el.classList.add('fade-in');
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
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="fade-in grid grid-cols-1 gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}
