import type { Types } from 'use-lanyard';

import { DISCORD_ID } from '@/lib/config';

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

export function getAvatarUrl(discordUser: Types.DiscordUser | undefined): string {
  if (!discordUser) return `https://api.lanyard.rest/${DISCORD_ID}.png`;
  const isAnimated = discordUser.avatar?.startsWith('a_');
  return `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${isAnimated ? 'gif' : 'png'}?size=128`;
}

export function getAvatarDecorationUrl(discordUser: Types.DiscordUser | undefined): string | null {
  const asset = (discordUser as any)?.avatar_decoration_data?.asset;
  return asset
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=128`
    : null;
}

export function getNameplateUrl(discordUser: Types.DiscordUser | undefined): string | null {
  const asset = (discordUser as any)?.collectibles?.nameplate?.asset;
  return asset ? `https://cdn.discordapp.com/${asset}nameplate.png?size=256` : null;
}

export function getNameplateColor(discordUser: Types.DiscordUser | undefined): string | null {
  const palette = (discordUser as any)?.collectibles?.nameplate?.palette;
  return palette ? (paletteColors[palette] ?? '#5865F2') : null;
}

export function getPrimaryGuildTag(discordUser: Types.DiscordUser | undefined): string | null {
  return (discordUser as any)?.primary_guild?.tag ?? null;
}

export function getPrimaryGuildBadgeUrl(discordUser: Types.DiscordUser | undefined): string | null {
  const guild = (discordUser as any)?.primary_guild;
  if (!guild?.badge || !guild?.identity_guild_id) return null;
  return `https://cdn.discordapp.com/guild-tag-badges/${guild.identity_guild_id}/${guild.badge}.png`;
}

export type LanyardVisuals = {
  avatarUrl: string;
  avatarDecorationUrl: string | null;
  nameplateUrl: string | null;
  nameplateColor: string | null;
  primaryGuildTag: string | null;
  primaryGuildBadgeUrl: string | null;
};

export function getLanyardVisuals(presence: Types.Presence | null): LanyardVisuals {
  const user = presence?.discord_user;
  return {
    avatarUrl: getAvatarUrl(user),
    avatarDecorationUrl: getAvatarDecorationUrl(user),
    nameplateUrl: getNameplateUrl(user),
    nameplateColor: getNameplateColor(user),
    primaryGuildTag: getPrimaryGuildTag(user),
    primaryGuildBadgeUrl: getPrimaryGuildBadgeUrl(user),
  };
}
