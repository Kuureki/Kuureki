'use client';

import { useEffect, useRef } from 'react';

import { useLanyard } from '@/components/LanyardProvider';

function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function getAssetUrl(
  activity: NonNullable<ReturnType<typeof useLanyard>['presence']>['activities'][number],
) {
  const assets = activity.assets;
  if (!assets) 
return null;

  if (assets.large_image?.startsWith('spotify:')) {
    return `https://i.scdn.co/image/${assets.large_image.replace('spotify:', '')}`;
  }

  if (activity.application_id && assets.large_image) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${assets.large_image}.png`;
  }

  return null;
}

export default function Activity() {
  const ref = useRef<HTMLDivElement>(null);
  const { presence } = useLanyard();

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

  const spotify = presence?.spotify;
  const isListeningToSpotify = presence?.listening_to_spotify;
  const activities = presence?.activities?.filter(a => a.name !== 'Spotify') ?? [];
  const isOnMobile = presence?.active_on_discord_mobile;
  const isOnDesktop = presence?.active_on_discord_desktop;

  if (!presence) {
    return (
      <section id="activity" className="border-border border-b py-20">
        <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
          <div ref={ref} className="fade-in">
            <div className="mb-[2.5rem]">
              <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
                03 — Activity
              </div>
              <h2 className="text-text font-serif text-[1.9rem] leading-[1.2] font-normal tracking-[-0.02em]">
                What I&apos;m up to.
              </h2>
              <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
                Live from Discord presence.
              </p>
            </div>
            <div className="text-text-dim flex items-center gap-3 font-mono text-[0.8rem]">
              <span className="bg-text-dim h-1.5 w-1.5 animate-pulse rounded-full" />
              Connecting...
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="activity" className="border-border border-b py-20">
      <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
        <div ref={ref} className="fade-in">
          <div className="mb-[2.5rem]">
            <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
              03 — Activity
            </div>
            <h2 className="text-text font-serif text-[1.9rem] leading-[1.2] font-normal tracking-[-0.02em]">
              What I&apos;m up to.
            </h2>
            <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
              Live from Discord presence.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {isListeningToSpotify && spotify && (
              <div className="bg-bg-2 border-border flex items-center gap-4 rounded-[10px] border p-4">
                {spotify.album_art_url && (
                  <img
                    src={spotify.album_art_url}
                    alt={spotify.album ?? 'Album art'}
                    className="h-16 w-16 flex-shrink-0 rounded-md"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="fill-green h-4 w-4 flex-shrink-0">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    <span className="text-green font-mono text-[0.68rem] tracking-[0.06em] uppercase">
                      Listening to Spotify
                    </span>
                  </div>
                  <div className="text-text truncate text-[0.9rem] font-medium">
                    {spotify.song ?? 'Unknown track'}
                  </div>
                  <div className="text-text-muted truncate text-[0.825rem]">
                    {spotify.artist ?? 'Unknown artist'}
{' '}
—{spotify.album ?? 'Unknown album'}
                  </div>
                  {spotify.timestamps?.start && spotify.timestamps?.end && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="bg-bg-3 h-1 flex-1 overflow-hidden rounded-full">
                        <div
                          className="bg-green h-full rounded-full transition-all duration-1000"
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
                      <span className="text-text-dim font-mono text-[0.65rem]">
                        {formatTime(Date.now() - spotify.timestamps.start)}
{' '}
/{' '}
                        {formatTime(spotify.timestamps.end - spotify.timestamps.start)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activities.length > 0
              && activities.map((activity) => {
                const imageUrl = getAssetUrl(activity);
                const typeLabel
                  = activity.type === 0
                    ? 'Playing'
                    : activity.type === 1
                      ? 'Streaming'
                      : activity.type === 2
                        ? 'Listening to'
                        : activity.type === 3
                          ? 'Watching'
                          : activity.type === 4
                            ? 'Custom'
                            : activity.type === 5
                              ? 'Competing in'
                              : '';

                return (
                  <div
                    key={activity.id ?? activity.name}
                    className="bg-bg-2 border-border flex items-start gap-4 rounded-[10px] border p-4"
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={activity.name}
                        className="h-16 w-16 flex-shrink-0 rounded-md"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-accent font-mono text-[0.68rem] tracking-[0.06em] uppercase">
                          {typeLabel}
                        </span>
                      </div>
                      <div className="text-text text-[0.9rem] font-medium">{activity.name}</div>
                      {activity.details && (
                        <div className="text-text-muted truncate text-[0.825rem]">
                          {activity.details}
                        </div>
                      )}
                      {activity.state && (
                        <div className="text-text-dim truncate text-[0.825rem]">
                          {activity.state}
                        </div>
                      )}
                      {activity.timestamps?.start && (
                        <div className="text-text-dim mt-2 font-mono text-[0.65rem]">
                          {formatTime(Date.now() - activity.timestamps.start)}
{' '}
elapsed
</div>
                      )}
                    </div>
                  </div>
                );
              })}

            {!isListeningToSpotify && activities.length === 0 && (
              <div className="bg-bg-2 border-border rounded-[10px] border p-4">
                <div className="text-text-muted text-[0.875rem]">
                  Nothing right now — probably building something.
                </div>
              </div>
            )}

            {(isOnMobile || isOnDesktop) && (
              <div className="flex flex-wrap gap-2">
                {isOnDesktop && (
                  <span className="border-border text-text-muted bg-bg-2 inline-flex items-center gap-[0.35rem] rounded border px-[0.65rem] py-[0.3rem] font-mono text-[0.72rem] tracking-[0.03em]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
                    </svg>
                    Desktop
                  </span>
                )}
                {isOnMobile && (
                  <span className="border-border text-text-muted bg-bg-2 inline-flex items-center gap-[0.35rem] rounded border px-[0.65rem] py-[0.3rem] font-mono text-[0.72rem] tracking-[0.03em]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
                    </svg>
                    Mobile
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
