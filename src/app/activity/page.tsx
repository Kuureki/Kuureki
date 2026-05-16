'use client';

import { useLanyard } from '@/components/LanyardProvider';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { DISCORD_ID, SITE } from '@/lib/config';

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

const paletteColors: Record<string, string> = {
  cobalt: '#5865F2',
  violet: '#9b59b6',
  pink: '#ff6b9d',
  red: '#ed4245',
  orange: '#f47b67',
  yellow: '#f0b232',
  green: '#57f287',
  blue: '#3498db',
  white: '#ffffff',
  grey: '#99aab5',
};

export default function ActivityPage() {
  const { presence, isLoading } = useLanyard();

  const discordUser = presence?.discord_user;
  const status = presence?.discord_status ?? 'offline';
  const activities = presence?.activities ?? [];
  const spotify = presence?.spotify ?? null;
  const avatarDecoration = discordUser?.avatar_decoration_data;
  const nameplate = (discordUser as any)?.collectibles?.nameplate;
  const primaryGuild = (discordUser as any)?.primary_guild;

  const isAnimated = discordUser?.avatar?.startsWith('a_');
  const avatarUrl = discordUser
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${isAnimated ? 'gif' : 'png'}?size=128`
    : `https://api.lanyard.rest/${DISCORD_ID}.png`;

  const avatarDecorationUrl = avatarDecoration?.asset
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${avatarDecoration.asset}.png?size=128`
    : null;

  const nameplateUrl = nameplate?.asset
    ? `https://cdn.discordapp.com/${nameplate.asset}nameplate.png?size=256`
    : null;

  const nameplateColor = nameplate?.palette
    ? paletteColors[nameplate.palette] ?? '#5865F2'
    : null;

  const primaryGuildBadgeUrl = primaryGuild?.badge
    ? `https://cdn.discordapp.com/guilds/${primaryGuild.identity_guild_id}/users/${discordUser?.id}/avatar.png?size=32`
    : null;

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
                Real-time Discord presence and activity feed.
              </p>
            </div>

            <div className="mt-12">
              {isLoading ? (
                <div className="border-border rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]">
                  <div className="text-text-dim animate-pulse font-mono text-[0.75rem]">
                    Connecting to Lanyard...
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Profile Card with Nameplate */}
                  <div className="border-border overflow-hidden rounded-[10px] border bg-bg-2">
                    {/* Nameplate banner */}
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
                          <img
                            src={avatarUrl}
                            alt="Discord avatar"
                            className="h-16 w-16 rounded-full"
                          />
                          {/* Avatar decoration overlay */}
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
                            {/* Primary guild badge */}
                            {primaryGuild?.tag && (
                              <span
                                className="rounded-sm border px-2 py-[0.1rem] font-mono text-[0.6rem]"
                                style={{
                                  borderColor: nameplateColor ? `${nameplateColor}33` : undefined,
                                  color: nameplateColor ?? undefined,
                                }}
                              >
                                {primaryGuild.tag}
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
                              {statusLabels[status]}
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
                    <div className="border-border rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]">
                      <div className="text-text-dim mb-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
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
                          <div className="text-text-muted text-[0.825rem]">
                            {spotify.artist}
                          </div>
                          <div className="text-text-dim mt-1 text-[0.75rem]">
                            on {spotify.album}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {activities
                    .filter((a) => a.name !== 'Spotify' && a.name !== 'Custom Status')
                    .map((activity) => (
                      <div
                        key={activity.id}
                        className="border-border rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]"
                      >
                        <div className="text-text-dim mb-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                          {activity.type === 0
                            ? 'Playing'
                            : activity.type === 1
                              ? 'Streaming'
                              : activity.type === 2
                                ? 'Listening to'
                                : activity.type === 3
                                  ? 'Watching'
                                  : activity.type === 4
                                    ? 'Custom Status'
                                    : activity.type === 5
                                      ? 'Competing in'
                                      : 'Using'}
                        </div>
                        <div className="flex items-start gap-4">
                          {activity.assets?.large_image && (
                            <img
                              src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`}
                              alt=""
                              className="h-16 w-16 flex-shrink-0 rounded-md"
                            />
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
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Custom Status */}
                  {activities
                    .filter((a) => a.name === 'Custom Status')
                    .map((activity) => (
                      <div
                        key={activity.id}
                        className="border-border rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]"
                      >
                        <div className="text-text-dim mb-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                          Custom Status
                        </div>
                        <div className="text-text text-[0.95rem]">
                          {activity.state ?? 'No custom status'}
                        </div>
                      </div>
                    ))}

                  {activities.length === 0 && !spotify && (
                    <div className="border-border rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]">
                      <div className="text-text-dim text-[0.875rem]">
                        No active activities.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
