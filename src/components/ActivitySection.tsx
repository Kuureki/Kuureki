'use client';

import { useEffect, useRef, useState } from 'react';

import {
  CursorArrowIcon,
  DesktopIcon,
  PersonIcon,
  PlayIcon,
  SpeakerLoudIcon,
  SpeakerModerateIcon,
  TimerIcon,
  VideoIcon,
} from '@radix-ui/react-icons';

import { ActivityCard } from '@/components/ActivityCard';
import AnilistCard from '@/components/AnilistCard';
import GitHubHeatmap from '@/components/GitHubHeatmap';

import SectionHeader from '@/components/SectionHeader';
import { useLanyard } from '@/components/LanyardProvider';
import { getAnilistFavourites, getAnilistProfile, getAnilistWatching } from '@/lib/anilist';
import type { AnilistFavourites, AnilistState } from '@/lib/anilist';
import { getGitHubContributions } from '@/lib/github';
import type { GitHubContributionDay } from '@/lib/github';
import {
  getAvatarDecorationUrl,
  getAvatarUrl,
  getNameplateColor,
  getNameplateUrl,
  getPrimaryGuildBadgeUrl,
  getPrimaryGuildTag,
} from '@/lib/lanyard';

const statusLabels: Record<string, string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
};

const statusColors: Record<string, string> = {
  online: 'bg-green',
  idle: 'bg-amber',
  dnd: 'bg-red',
  offline: 'bg-text-dim',
};

const activityTypeIcons: Record<number, React.ComponentType<{ className?: string }>> = {
  0: DesktopIcon,
  1: PlayIcon,
  2: SpeakerModerateIcon,
  3: VideoIcon,
  4: PersonIcon,
  5: TimerIcon,
};

const activityTypeLabels: Record<number, string> = {
  0: 'Playing',
  1: 'Streaming',
  2: 'Listening to',
  3: 'Watching',
  4: 'Custom Status',
  5: 'Competing in',
};

function resolveDiscordImage(applicationId: string, asset: string): string {
  if (asset.startsWith('mp:'))
    return `https://media.discordapp.net/${asset.slice(3)}`;
  if (asset.startsWith('spotify:'))
    return `https://i.scdn.co/image/${asset.slice(8)}`;
  return `https://cdn.discordapp.com/app-assets/${applicationId}/${asset}.png`;
}

function formatTimestamps(start?: number, _end?: number): string | null {
  if (!start)
    return null;

  const elapsed = Date.now() - start;
  if (elapsed < 0)
    return null;

  const mins = Math.floor(elapsed / 60000);
  const hrs = Math.floor(mins / 60);
  if (hrs > 0)
    return `${hrs}h ${mins % 60}m elapsed`;
  if (mins > 0)
    return `${mins}m elapsed`;
  return 'Just started';
}

export default function ActivitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { presence, isLoading } = useLanyard();
  const [contributions, setContributions] = useState<GitHubContributionDay[]>([]);
  const [anilist, setAnilist] = useState<AnilistState>({ profile: null, watching: [] });
  const [favourites, setFavourites] = useState<AnilistFavourites>({ anime: [], characters: [] });

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

  useEffect(() => {
    getGitHubContributions().then(setContributions);
    getAnilistProfile().then(async (profile) => {
      const watching = profile ? await getAnilistWatching(profile.userId) : [];
      setAnilist({ profile, watching });
    });
    getAnilistFavourites().then(setFavourites);
  }, []);

  const discordUser = presence?.discord_user;
  const status = presence?.discord_status ?? 'offline';
  const activities = presence?.activities ?? [];
  const spotify = presence?.spotify ?? null;

  const avatarUrl = getAvatarUrl(presence?.discord_user);
  const avatarDecorationUrl = getAvatarDecorationUrl(presence?.discord_user);
  const nameplateUrl = getNameplateUrl(presence?.discord_user);
  const nameplateColor = getNameplateColor(presence?.discord_user);
  const primaryGuildTag = getPrimaryGuildTag(presence?.discord_user);
  const primaryGuildBadgeUrl = getPrimaryGuildBadgeUrl(presence?.discord_user);

  const filteredActivities = activities.filter(a => a.name !== 'Spotify' && a.name !== 'Custom Status');
  const customStatuses = activities.filter(a => a.name === 'Custom Status');

  return (
    <section id="activity" className="border-b border-border py-20">
      <div className="mx-auto max-w-[740px] px-6 xs:px-[1.1rem]">
        <div ref={ref} className="fade-in">
          <SectionHeader
            title="What I'm up to"
            subtitle="Live Discord presence, GitHub commits, and the anime I'm watching. Everything here is pulled from somewhere real."
          />

          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-[10px] border border-border bg-bg-2">
              {nameplateUrl && (
                <div
                  className="h-[72px] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${nameplateUrl})`,
                    backgroundColor: nameplateColor ?? undefined,
                  }}
                />
              )}
              <div className="px-[1.6rem] pb-[1.6rem] pt-4">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <img src={avatarUrl} alt="Discord avatar" className="h-16 w-16 rounded-full" />
                    {avatarDecorationUrl && (
                      <img
                        src={avatarDecorationUrl}
                        alt=""
                        className="pointer-events-none absolute -inset-3 h-auto w-auto"
                      />
                    )}
                    <span
                      className={`absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 border-bg-2 ${statusColors[status] || 'bg-text-dim'}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-[1.3rem] text-text">
                        {discordUser?.display_name ?? discordUser?.username ?? 'Unknown'}
                      </h3>
                      {primaryGuildTag && (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-sm border px-2 py-[0.1rem] font-mono text-[0.6rem]"
                          style={{
                            borderColor: nameplateColor ? `${nameplateColor}33` : undefined,
                            color: nameplateColor ?? undefined,
                          }}
                        >
                          {primaryGuildBadgeUrl && (
                            <img src={primaryGuildBadgeUrl} alt="" className="h-3.5 w-3.5" />
                          )}
                          {primaryGuildTag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-sm border px-2 py-[0.18rem] font-mono text-[0.65rem] ${
                          status === 'online'
                            ? 'border-green/20 text-green'
                            : status === 'idle'
                              ? 'border-amber/20 text-amber'
                              : status === 'dnd'
                                ? 'border-red/20 text-red'
                                : 'border-border text-text-dim'
                        }`}
                      >
                        {isLoading ? 'Connecting...' : statusLabels[status]}
                      </span>
                      {discordUser?.username && (
                        <span className="font-mono text-[0.65rem] text-text-dim">
                          @
                          {discordUser.username}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {spotify && (
              <ActivityCard label="Listening to Spotify" icon={<SpeakerLoudIcon className="h-3.5 w-3.5" />}>
                <div className="flex items-start gap-4">
                  {spotify.album_art_url && (
                    <img
                      src={spotify.album_art_url}
                      alt={spotify.album ?? ''}
                      className="h-16 w-16 flex-shrink-0 rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <div className="mb-1 text-[0.95rem] font-medium text-text">{spotify.song}</div>
                    <div className="text-[0.825rem] text-text-muted">{spotify.artist}</div>
                    <div className="mt-1 text-[0.75rem] text-text-dim">
                      on
                      {' '}
                      {spotify.album}
                    </div>
                  </div>
                </div>
              </ActivityCard>
            )}

            {filteredActivities.map((activity) => {
              const ActivityIcon = activityTypeIcons[activity.type] ?? CursorArrowIcon;
              const assets = activity.assets;

              let largeImageSrc: string | null = null;
              let smallImageSrc: string | null = null;

              if (assets?.large_image && activity.application_id) {
                largeImageSrc = resolveDiscordImage(activity.application_id, assets.large_image);
              }
              if (assets?.small_image && activity.application_id) {
                smallImageSrc = resolveDiscordImage(activity.application_id, assets.small_image);
              }

              const timeInfo = formatTimestamps(activity.timestamps?.start, activity.timestamps?.end);

              return (
                <ActivityCard
                  key={activity.id}
                  label={activityTypeLabels[activity.type] ?? 'Using'}
                  icon={<ActivityIcon className="h-3.5 w-3.5" />}
                >
                  <div className="flex items-start gap-4">
                    {largeImageSrc && (
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <img src={largeImageSrc} alt="" className="h-16 w-16 rounded-md" />
                        {smallImageSrc && (
                          <img
                            src={smallImageSrc}
                            alt=""
                            className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-2 border-bg-2"
                          />
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="mb-1 text-[0.95rem] font-medium text-text">{activity.name}</div>
                      {activity.details && (
                        <div className="text-[0.825rem] text-text-muted">{activity.details}</div>
                      )}
                      {activity.state && (
                        <div className="mt-1 text-[0.75rem] text-text-dim">{activity.state}</div>
                      )}
                      {timeInfo && (
                        <div className="mt-1 font-mono text-[0.65rem] text-text-dim">{timeInfo}</div>
                      )}
                    </div>
                  </div>
                </ActivityCard>
              );
            })}

            {customStatuses.map(activity => (
              <ActivityCard key={activity.id} label="Custom Status" icon={<PersonIcon className="h-3.5 w-3.5" />}>
                <div className="text-[0.95rem] text-text">{activity.state ?? 'No custom status'}</div>
              </ActivityCard>
            ))}

            {activities.length === 0 && !spotify && !isLoading && (
              <ActivityCard label="Activity" icon={<CursorArrowIcon className="h-3.5 w-3.5" />}>
                <div className="text-[0.875rem] text-text-muted">No active activities.</div>
              </ActivityCard>
            )}

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-[10px] border border-border bg-bg-2 px-[1.6rem] py-[1.6rem]">
                <GitHubHeatmap contributions={contributions} />
              </div>
              <AnilistCard
                profile={anilist.profile}
                watching={anilist.watching}
                favourites={favourites}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
