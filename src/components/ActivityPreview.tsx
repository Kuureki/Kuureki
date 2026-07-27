'use client';

import { useEffect, useRef } from 'react';

import SectionHeader from '@/components/SectionHeader';
import { useLanyard } from '@/components/LanyardProvider';
import { SITE } from '@/lib/config';
import { cn } from '@/lib/utils';

function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

const statusColors: Record<string, string> = {
  online: 'bg-green',
  idle: 'bg-amber',
  dnd: 'bg-red',
  offline: 'bg-text-dim',
};

export default function ActivityPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { presence, isLoading } = useLanyard();

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

  const spotify = presence?.spotify;
  const isListeningToSpotify = presence?.listening_to_spotify;
  const status = presence?.discord_status ?? 'offline';

  return (
    <section id="activity" className="border-b border-border py-20">
      <div className="mx-auto max-w-[740px] px-6 xs:px-[1.1rem]">
        <div ref={ref} className="fade-in">
          <SectionHeader
            title="What I'm up to"
            subtitle="Live Discord presence, pulled straight from the source."
            action={{ label: 'Full activity', href: '/activity' }}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[10px] border border-border bg-bg-2 p-4">
              <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
                Discord status
              </div>
              <div className="flex items-center gap-3">
                <span className={cn('h-2.5 w-2.5 rounded-full', statusColors[status] || 'bg-text-dim')} />
                <span className="text-[0.9rem] text-text">
                  {isLoading ? 'Connecting...' : status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <div className="mt-3 text-[0.8rem] text-text-muted">
                {SITE.name}
                {' '}
                ·
                {' '}
                {SITE.location}
              </div>
            </div>

            <div className="rounded-[10px] border border-border bg-bg-2 p-4">
              <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
                Listening to Spotify
              </div>
              {isListeningToSpotify && spotify
                ? (
                    <div className="flex items-start gap-4">
                      {spotify.album_art_url && (
                        <img
                          src={spotify.album_art_url}
                          alt={spotify.album ?? 'Album art'}
                          className="h-14 w-14 flex-shrink-0 rounded-md"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[0.9rem] font-medium text-text">{spotify.song}</div>
                        <div className="truncate text-[0.825rem] text-text-muted">{spotify.artist}</div>
                        {spotify.timestamps?.start && spotify.timestamps?.end && (
                          <div className="mt-2">
                            <div className="h-1 flex-1 overflow-hidden rounded-full bg-bg-3">
                              <div
                                className="h-full rounded-full bg-green transition-all duration-1000"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    ((Date.now() - spotify.timestamps.start)
                                      / (spotify.timestamps.end - spotify.timestamps.start))
                                    * 100,
                                  )}%`,
                                }}
                              />
                            </div>
                            <div className="mt-1 font-mono text-[0.65rem] text-text-dim">
                              {formatTime(Date.now() - spotify.timestamps.start)}
                              {' '}
                              /
                              {' '}
                              {formatTime(spotify.timestamps.end - spotify.timestamps.start)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                : (
                    <div className="text-[0.85rem] text-text-muted">Not playing anything right now.</div>
                  )}
            </div>
          </div>

          <div className="mt-6 rounded-[10px] border border-dashed border-border p-4">
            <div className="flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
              <span className="text-[0.85rem] text-text-muted">
                Want the full picture? GitHub heatmap, current obsessions, and more live details.
              </span>
              <a
                href="/activity"
                className="font-mono text-[0.75rem] tracking-[0.02em] text-accent no-underline transition-colors duration-150 hover:text-text"
              >
                Open activity page →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
