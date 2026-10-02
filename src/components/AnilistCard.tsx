import type { AnilistAnime, AnilistCharacter, AnilistFavourite, AnilistProfile } from '@/lib/anilist';

interface AnilistCardProps {
  profile: AnilistProfile | null;
  watching: AnilistAnime[];
  favourites: {
    anime: AnilistFavourite[];
    characters: AnilistCharacter[];
  };
}

function formatDays(minutes: number): string {
  const days = Math.round(minutes / 60 / 24);
  if (days < 1)
    return 'less than a day';
  return `${days} days`;
}

function formatNextAiring(timestamp: number | null): string | null {
  if (!timestamp)
    return null;
  const diff = timestamp - Math.floor(Date.now() / 1000);
  if (diff <= 0)
    return null;
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  if (days > 0)
    return `ep ${days}d ${hours}h`;
  return `ep ${hours}h`;
}

export default function AnilistCard({ profile, watching, favourites }: AnilistCardProps) {
  if (!profile)
    return null;

  return (
    <div className="rounded-[10px] border border-border bg-bg-2 px-[1.6rem] py-[1.6rem]">
      <a
        href={profile.siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim no-underline transition-colors duration-150 hover:text-text"
      >
        <span>AniList</span>
        <span className="normal-case tracking-normal text-text-dim">
          anilist.co/user/
          {profile.username}
        </span>
      </a>

      <div className="flex items-center gap-4">
        <img
          src={profile.avatarUrl}
          alt={`${profile.username} on AniList`}
          className="h-14 w-14 flex-shrink-0 rounded-full border border-border"
        />
        <div className="flex-1">
          <div className="text-[0.95rem] font-medium text-text">{profile.username}</div>
          <div className="text-[0.78rem] text-text-dim">
            {profile.animeCount}
            {' '}
            anime
            {' '}
            ·
            {' '}
            {profile.mangaCount}
            {' '}
            manga
            {' '}
            ·
            {' '}
            {formatDays(profile.minutesWatched)}
            {' '}
            watched
          </div>
          <div className="mt-1 text-[0.72rem] text-text-dim">
            Mean score
            {' '}
            {profile.meanScore.toFixed(1)}
            {' '}
            ·
            {' '}
            {profile.episodesWatched.toLocaleString()}
            {' '}
            episodes
            {' '}
            ·
            {' '}
            {profile.chaptersRead.toLocaleString()}
            {' '}
            chapters
          </div>
        </div>
      </div>

      {watching.length > 0 && (
        <div className="mt-6 border-t border-border pt-4">
          <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
            Currently watching
          </div>
          <div className="flex flex-col gap-3">
            {watching.slice(0, 3).map(anime => (
              <a
                key={anime.id}
                href={anime.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 no-underline"
              >
                <img
                  src={anime.coverImage}
                  alt={anime.title}
                  className="h-12 w-9 flex-shrink-0 rounded-sm border border-border object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[0.85rem] font-medium text-text transition-colors duration-150 group-hover:text-accent">
                    {anime.title}
                  </div>
                  <div className="font-mono text-[0.68rem] text-text-dim">
                    {anime.progress ?? '?'}
                    /
                    {anime.episodes ?? '?'}
                    {anime.score ? ` · ${anime.score}/10` : ''}
                    {formatNextAiring(anime.nextAiringAt) ? ` · next ${formatNextAiring(anime.nextAiringAt)}` : ''}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {favourites.characters.length > 0 && (
        <div className="mt-6 border-t border-border pt-4">
          <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
            Favourite characters
          </div>
          <div className="flex flex-wrap gap-1.5">
            {favourites.characters.slice(0, 8).map(char => (
              <a
                key={char.id}
                href={char.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-2.5 py-1 text-[0.72rem] text-text-muted no-underline transition-colors duration-150 hover:border-border-hover hover:text-text"
              >
                {char.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {favourites.anime.length > 0 && (
        <div className="mt-6 border-t border-border pt-4">
          <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
            Favourite anime
          </div>
          <div className="grid grid-cols-3 gap-2">
            {favourites.anime.slice(0, 6).map(anime => (
              <a
                key={anime.id}
                href={anime.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline"
              >
                <img
                  src={anime.coverImage ?? ''}
                  alt={anime.title}
                  className="aspect-[2/3] w-full rounded-sm border border-border object-cover transition-transform duration-150 group-hover:scale-[1.03]"
                />
                <div className="mt-1.5 line-clamp-2 text-[0.66rem] leading-tight text-text-dim transition-colors duration-150 group-hover:text-text">
                  {anime.title}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
