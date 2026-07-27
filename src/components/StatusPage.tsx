import Link from 'next/link';

interface StatusPageProps {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  action?: string;
  href?: string;
  onAction?: () => void;
}

export default function StatusPage({
  code,
  eyebrow,
  title,
  description,
  action = 'Back to home',
  href = '/',
  onAction,
}: StatusPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="w-full max-w-[560px]">
        <div className="mb-8 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-dim">
          <span className="text-accent">{code}</span>
          <span className="h-px w-8 bg-border" />
          <span>{eyebrow}</span>
        </div>
        <h1 className="max-w-[500px] font-serif text-[clamp(2.6rem,8vw,4.8rem)] leading-[0.98] font-normal tracking-[-0.035em] text-text">
          {title}
        </h1>
        <p className="mt-6 max-w-[450px] text-[0.95rem] leading-[1.75] text-text-muted">
          {description}
        </p>
        {(href || onAction) && (
          <Link
            href={href || '#'}
            onClick={onAction}
            className="mt-9 inline-flex rounded-[8px] bg-text px-4 py-2.5 text-[0.825rem] font-medium text-bg no-underline transition-colors duration-150 hover:bg-[#d0d0d8]"
          >
            {action}
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </main>
  );
}
