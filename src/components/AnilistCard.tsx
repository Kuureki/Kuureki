import type { AnilistAnime, AnilistFavourites, AnilistProfile } from '@/lib/anilist';

import DitherImage from '@/components/DitherImage';

interface AnilistCardProps {
  profile: AnilistProfile | null;
  watching: AnilistAnime[];
  favourites: AnilistFavourites;
}

function formatDays(minutes: number): string {
  const days = Math.round(minutes / 60 / 24);
  if (days < 1)
    return 'less than a day';
  return `${days.toLocaleString()} days`;
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
        className="mb-5 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim no-underline transition-colors duration-150 hover:text-text"
      >
        <span>AniList</span>
        <span className="normal-case tracking-normal text-text-dim">
          anilist.co/user/
          {profile.username}
        </span>
      </a>

      <p className="text-[0.95rem] text-text-muted">
        I keep a public list of everything I have watched, and a much shorter list of the things that actually stuck with me.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-5 sm:grid-cols-3">
        <div>
          <div className="font-serif text-[1.6rem] leading-none text-text tabular-nums">
            {profile.animeCount.toLocaleString()}
          </div>
          <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-dim">
            anime
          </div>
        </div>
        <div>
          <div className="font-serif text-[1.6rem] leading-none text-text tabular-nums">
            {profile.episodesWatched.toLocaleString()}
          </div>
          <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-dim">
            episodes
          </div>
        </div>
        <div>
          <div className="font-serif text-[1.6rem] leading-none text-text tabular-nums">
            {formatDays(profile.minutesWatched)}
          </div>
          <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-dim">
            watched
          </div>
        </div>
        <div>
          <div className="font-serif text-[1.6rem] leading-none text-text tabular-nums">
            {profile.meanScore.toFixed(1)}
          </div>
          <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-dim">
            mean score
          </div>
        </div>
        <div>
          <div className="font-serif text-[1.6rem] leading-none text-text tabular-nums">
            {profile.mangaCount.toLocaleString()}
          </div>
          <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-dim">
            manga
          </div>
        </div>
        <div>
          <div className="font-serif text-[1.6rem] leading-none text-text tabular-nums">
            {profile.chaptersRead.toLocaleString()}
          </div>
          <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-dim">
            chapters
          </div>
        </div>
      </div>

      {watching.length > 0 && (
        <div className="mt-7 border-t border-border pt-5">
          <div className="mb-3.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
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
        <div className="mt-7 border-t border-border pt-5">
          <div className="mb-3.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
            Favourite characters
          </div>
          <div className="grid grid-cols-3 gap-2.5 xs:grid-cols-4 sm:grid-cols-5">
            {favourites.characters.map((char) => {
              if (!char.imageUrl)
                return null;

              return (
                <a
                  key={char.id}
                  href={char.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={char.name}
                  className="group no-underline"
                >
                  <DitherImage
                    src={char.imageUrl}
                    alt={char.name}
                    className="aspect-square w-full rounded-sm border border-border"
                  />
                  <div className="mt-1.5 line-clamp-2 text-[0.66rem] leading-tight text-text-dim transition-colors duration-150 group-hover:text-text">
                    {char.name}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {favourites.anime.length > 0 && (
        <div className="mt-7 border-t border-border pt-5">
          <div className="mb-3.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
            Favourite anime
          </div>
          <div className="grid grid-cols-3 gap-2.5 xs:grid-cols-4 sm:grid-cols-5">
            {favourites.anime.map(anime => (
              <a
                key={anime.id}
                href={anime.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline"
              >
                <DitherImage
                  src={anime.coverImage ?? ''}
                  alt={anime.title}
                  className="aspect-[2/3] w-full rounded-sm border border-border"
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
