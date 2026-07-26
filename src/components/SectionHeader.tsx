import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  className?: string;
}

export default function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-10 md:mb-12', className)}>
      <h2 className="text-text font-serif text-[1.75rem] leading-[1.15] tracking-[-0.02em] md:text-[2rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted mt-2 max-w-[480px] text-[0.9rem] leading-[1.65]">
          {subtitle}
        </p>
      )}
      {action && (
        <a
          href={action.href}
          className="text-text-dim hover:text-accent mt-4 inline-flex items-center gap-1 font-mono text-[0.75rem] tracking-[0.02em] no-underline transition-colors duration-150"
        >
          {action.label}
          {' '}
          <span className="text-[0.85em]">→</span>
        </a>
      )}
    </div>
  );
}
