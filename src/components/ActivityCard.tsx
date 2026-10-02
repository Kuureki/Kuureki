'use client';

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
