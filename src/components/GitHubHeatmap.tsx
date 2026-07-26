'use client';

import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface GitHubHeatmapProps {
  contributions: {
    date: string;
    count: number;
    level: number;
  }[];
}

const levelColors = ['bg-bg-3', 'bg-green/25', 'bg-green/45', 'bg-green/65', 'bg-green/85'];

export default function GitHubHeatmap({ contributions }: GitHubHeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const weeks: typeof contributions[] = [];
  let currentWeek: typeof contributions = [];

  for (let i = 0; i < contributions.length; i++) {
    currentWeek.push(contributions[i]);
    if (currentWeek.length === 7 || i === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <div ref={containerRef} className="relative">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
          GitHub activity
        </div>
        <div className="font-mono text-[0.75rem] text-text-muted">
          {totalContributions.toLocaleString()}
          {' '}
          public events in the last year
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-[3px]" style={{ minWidth: 'fit-content' }}>
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-[3px]">
              {week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={cn(
                    'h-[11px] w-[11px] cursor-pointer rounded-sm transition-colors duration-100',
                    levelColors[day.level],
                  )}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const containerRect = containerRef.current?.getBoundingClientRect();
                    setTooltip({
                      date: day.date,
                      count: day.count,
                      x: rect.left - (containerRect?.left ?? 0),
                      y: rect.top - (containerRect?.top ?? 0),
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span className="text-[0.65rem] text-text-dim">Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`h-[11px] w-[11px] rounded-sm ${color}`} />
        ))}
        <span className="text-[0.65rem] text-text-dim">More</span>
      </div>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-md border border-border bg-bg-2 px-2.5 py-1.5 shadow-lg"
          style={{
            left: tooltip.x - 40,
            top: tooltip.y - 45,
          }}
        >
          <div className="whitespace-nowrap font-mono text-[0.7rem] text-text">
            {tooltip.count}
            {' '}
            contribution
            {tooltip.count !== 1 ? 's' : ''}
          </div>
          <div className="whitespace-nowrap font-mono text-[0.65rem] text-text-dim">{tooltip.date}</div>
        </div>
      )}
    </div>
  );
}
