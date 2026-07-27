export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24" aria-label="Loading">
      <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-dim">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        Loading
      </div>
    </main>
  );
}
