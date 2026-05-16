'use client';

import {
  SpeakerLoudIcon,
  DesktopIcon,
  PlayIcon,
  SpeakerModerateIcon,
  VideoIcon,
  PersonIcon,
  TimerIcon,
  CursorArrowIcon,
} from '@radix-ui/react-icons';
import { useLanyard } from '@/components/LanyardProvider';
import Contact from '@/components/Contact';
import CurrentObsession from '@/components/CurrentObsession';
import Footer from '@/components/Footer';
import GitHubHeatmap from '@/components/GitHubHeatmap';
import Nav from '@/components/Nav';
import RotatingQuote from '@/components/RotatingQuote';
import { CURRENT_OBSESSION, DISCORD_ID, GITHUB_USERNAME, QUOTES, SITE } from '@/lib/config';
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
  dnd: 'bg-red-500',
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
  if (asset.startsWith('mp:external')) {
    return `https://media.discordapp.net/${asset.replace('mp:', '')}`;
  }
  return `https://cdn.discordapp.com/app-assets/${applicationId}/${asset}.png`;
}

function formatTimestamps(start?: number, end?: number): string | null {
  if (!start) return null;
  const now = Date.now();
  const startDate = new Date(start);
  if (end) {
    const elapsed = now - start;
    const total = end - start;
    const remaining = total - elapsed;
    if (remaining <= 0) return null;
    const mins = Math.floor(remaining / 60000);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) return `${hrs}h ${mins % 60}m left`;
    return `${mins}m left`;
  }
  const elapsed = now - start;
  const mins = Math.floor(elapsed / 60000);
  const hrs = Math.floor(mins / 60);
  if (hrs > 0) return `${hrs}h ${mins % 60}m elapsed`;
  if (mins > 0) return `${mins}m elapsed`;
  return 'Just started';
}

export default function ActivityPage() {
  const { presence, isLoading } = useLanyard();

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

  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[6rem] pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/#activity"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Back to home
              </a>
            </div>

            <div className="mb-4">
              <div className="text-text-dim mb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
                Activity
              </div>
              <h1 className="text-[clamp(2rem, 5vw, 3rem)] text-text font-serif leading-[1.1] font-normal tracking-[-0.02em]">
                What I&apos;m up to.
              </h1>
              <p className="text-text-muted mt-[0.6rem] max-w-[460px] text-[0.875rem]">
                Real-time Discord presence, GitHub activity, and current obsessions.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-6">
              {/* Discord Profile Card */}
              <div className="border-border bg-bg-2 overflow-hidden rounded-[10px] border">
                {nameplateUrl && (
                  <div
                    className="h-[72px] w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${nameplateUrl})`,
                      backgroundColor: nameplateColor ?? undefined,
                    }}
                  />
                )}
                <div className="px-[1.6rem] pt-4 pb-[1.6rem]">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={avatarUrl}
                        alt="Discord avatar"
                        className="h-16 w-16 rounded-full"
                      />
                      {avatarDecorationUrl && (
                        <img
                          src={avatarDecorationUrl}
                          alt=""
                          className="pointer-events-none absolute -inset-3 h-auto w-auto"
                        />
                      )}
                      <span
                        className={`border-bg-2 absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 ${statusColors[status] || 'bg-text-dim'}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-text font-serif text-[1.3rem]">
                          {discordUser?.display_name ?? discordUser?.username ?? 'Unknown'}
                        </h2>
                        {primaryGuildTag && (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-sm border px-2 py-[0.1rem] font-mono text-[0.6rem]"
                            style={{
                              borderColor: nameplateColor ? `${nameplateColor}33` : undefined,
                              color: nameplateColor ?? undefined,
                            }}
                          >
                            {primaryGuildBadgeUrl && (
                              <img
                                src={primaryGuildBadgeUrl}
                                alt=""
                                className="h-3.5 w-3.5"
                              />
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
                                  ? 'border-red-500/20 text-red-500'
                                  : 'border-border text-text-dim'
                          }`}
                        >
                          {isLoading ? 'Connecting...' : statusLabels[status]}
                        </span>
                        {discordUser?.id && (
                          <span className="text-text-dim font-mono text-[0.65rem]">
                            ID: {discordUser.id}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spotify Card */}
              {spotify && (
                <div className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.6rem]">
                  <div className="text-text-dim mb-3 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                    <SpeakerLoudIcon className="h-3.5 w-3.5" />
                    Listening to Spotify
                  </div>
                  <div className="flex items-start gap-4">
                    {spotify.album_art_url && (
                      <img
                        src={spotify.album_art_url ?? undefined}
                        alt={spotify.album ?? ''}
                        className="h-16 w-16 flex-shrink-0 rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-text mb-1 text-[0.95rem] font-medium">
                        {spotify.song}
                      </div>
                      <div className="text-text-muted text-[0.825rem]">{spotify.artist}</div>
                      <div className="text-text-dim mt-1 text-[0.75rem]">on {spotify.album}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Activities */}
              {activities
                .filter((a) => a.name !== 'Spotify' && a.name !== 'Custom Status')
                .map((activity) => {
                  const ActivityIcon = activityTypeIcons[activity.type] ?? CursorArrowIcon;
                  const activityAssets = activity.assets;

                  let largeImageSrc: string | null = null;
                  let smallImageSrc: string | null = null;

                  if (activityAssets?.large_image && activity.application_id) {
                    largeImageSrc = resolveDiscordImage(activity.application_id, activityAssets.large_image);
                  }
                  if (activityAssets?.small_image && activity.application_id) {
                    smallImageSrc = resolveDiscordImage(activity.application_id, activityAssets.small_image);
                  }

                  const timeInfo = formatTimestamps(
                    activity.timestamps?.start,
                    activity.timestamps?.end,
                  );

                  return (
                    <div
                      key={activity.id}
                      className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.6rem]"
                    >
                      <div className="text-text-dim mb-3 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                        <ActivityIcon className="h-3.5 w-3.5" />
                        {activityTypeLabels[activity.type] ?? 'Using'}
                      </div>
                      <div className="flex items-start gap-4">
                        {largeImageSrc && (
                          <div className="relative h-16 w-16 flex-shrink-0">
                            <img
                              src={largeImageSrc}
                              alt=""
                              className="h-16 w-16 rounded-md"
                            />
                            {smallImageSrc && (
                              <img
                                src={smallImageSrc}
                                alt=""
                                className="border-bg-2 absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-2"
                              />
                            )}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="text-text mb-1 text-[0.95rem] font-medium">
                            {activity.name}
                          </div>
                          {activity.details && (
                            <div className="text-text-muted text-[0.825rem]">
                              {activity.details}
                            </div>
                          )}
                          {activity.state && (
                            <div className="text-text-dim mt-1 text-[0.75rem]">
                              {activity.state}
                            </div>
                          )}
                          {timeInfo && (
                            <div className="text-text-dim mt-1 font-mono text-[0.65rem]">
                              {timeInfo}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Custom Status */}
              {activities
                .filter((a) => a.name === 'Custom Status')
                .map((activity) => (
                  <div
                    key={activity.id}
                    className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.6rem]"
                  >
                    <div className="text-text-dim mb-3 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                      <PersonIcon className="h-3.5 w-3.5" />
                      Custom Status
                    </div>
                    <div className="text-text text-[0.95rem]">
                      {activity.state ?? 'No custom status'}
                    </div>
                  </div>
                ))}

              {activities.length === 0 && !spotify && !isLoading && (
                <div className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.6rem]">
                  <div className="text-text-dim text-[0.875rem]">No active activities.</div>
                </div>
              )}

              {/* GitHub Contribution Heatmap */}
              <div className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.6rem]">
                <GitHubHeatmap username={GITHUB_USERNAME} />
              </div>

              {/* Current Obsession */}
              <CurrentObsession obsession={CURRENT_OBSESSION} />

              {/* Rotating Quote */}
              <RotatingQuote quotes={QUOTES} interval={8000} />
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
