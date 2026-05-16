'use client';

import { useEffect, useRef, useState } from 'react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubHeatmapProps {
  username: string;
}

const levelColors = [
  'bg-bg-3',
  'bg-green/20',
  'bg-green/35',
  'bg-green/55',
  'bg-green/75',
];

const levelColorsHover = [
  'hover:bg-bg-3',
  'hover:bg-green/30',
  'hover:bg-green/45',
  'hover:bg-green/65',
  'hover:bg-green/90',
];

function generateMockContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 364);

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isRecent = i > 300;

    let count = 0;
    if (!isWeekend) {
      const rand = Math.random();
      if (rand > 0.6) count = Math.floor(Math.random() * 8) + 1;
      if (rand > 0.85) count = Math.floor(Math.random() * 12) + 4;
      if (isRecent && rand > 0.5) count = Math.floor(Math.random() * 6) + 1;
    } else {
      const rand = Math.random();
      if (rand > 0.8) count = Math.floor(Math.random() * 3) + 1;
    }

    const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4;

    days.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    });
  }

  return days;
}

export default function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContributions(generateMockContributions());
  }, []);

  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

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
        <div className="text-text-dim font-mono text-[0.68rem] tracking-[0.1em] uppercase">
          GitHub Contributions
        </div>
        <div className="text-text-muted font-mono text-[0.75rem]">
          {totalContributions.toLocaleString()} contributions in the last year
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-[3px]" style={{ minWidth: 'fit-content' }}>
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-[3px]">
              {week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`h-[11px] w-[11px] rounded-sm ${levelColors[day.level]} ${levelColorsHover[day.level]} cursor-pointer transition-colors duration-100`}
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
        <span className="text-text-dim text-[0.65rem]">Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`h-[11px] w-[11px] rounded-sm ${color}`} />
        ))}
        <span className="text-text-dim text-[0.65rem]">More</span>
      </div>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-md border border-border bg-bg-2 px-2.5 py-1.5 shadow-lg"
          style={{
            left: tooltip.x - 40,
            top: tooltip.y - 40,
          }}
        >
          <div className="text-text whitespace-nowrap font-mono text-[0.7rem]">
            {tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''}
          </div>
          <div className="text-text-dim whitespace-nowrap font-mono text-[0.65rem]">
            {tooltip.date}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-dim hover:text-text font-mono text-[0.72rem] no-underline transition-colors duration-150"
        >
          View profile →
        </a>
      </div>
    </div>
  );
}
