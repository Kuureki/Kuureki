import { ANILIST_USERNAME } from './config';

const ANILIST_ENDPOINT = 'https://graphql.anilist.co';

export interface AnilistAnime {
  id: number;
  title: string;
  coverImage: string;
  siteUrl: string;
  progress: number | null;
  episodes: number | null;
  score: number | null;
  meanScore: number | null;
  format: string | null;
  genres: string[];
  nextEpisode: number | null;
  nextAiringAt: number | null;
}

export interface AnilistProfile {
  userId: number;
  username: string;
  siteUrl: string;
  avatarUrl: string;
  animeCount: number;
  episodesWatched: number;
  minutesWatched: number;
  meanScore: number;
  mangaCount: number;
  chaptersRead: number;
}

export interface AnilistState {
  profile: AnilistProfile | null;
  watching: AnilistAnime[];
}

export interface AnilistFavourite {
  id: number;
  title: string;
  siteUrl: string;
  coverImage: string | null;
}

export interface AnilistCharacter {
  id: number;
  name: string;
  siteUrl: string;
  imageUrl: string | null;
}

const PROFILE_QUERY = `
  query($name: String) {
    User(name: $name) {
      id
      name
      siteUrl
      avatar { large }
      statistics {
        anime { count episodesWatched minutesWatched meanScore }
        manga { count chaptersRead }
      }
    }
  }
`;

const FAVOURITES_QUERY = `
  query($name: String) {
    User(name: $name) {
      favourites {
        anime {
          nodes {
            id
            title { romaji english }
            siteUrl
            coverImage { large }
          }
        }
        characters {
          nodes {
            id
            name { full }
            siteUrl
            image { large }
          }
        }
      }
    }
  }
`;

const STATUS_QUERY = `
  query($id: Int, $status: MediaListStatus) {
    MediaListCollection(userId: $id, type: ANIME, status: $status, sort: [UPDATED_TIME_DESC]) {
      lists {
        entries {
          progress
          score
          media {
            id
            title { romaji english }
            coverImage { large }
            siteUrl
            episodes
            format
            meanScore
            genres
            nextAiringEpisode { airingAt episode }
          }
        }
      }
    }
  }
`;

async function anilistFetch<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  try {
    const res = await fetch(ANILIST_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!res.ok)
      return null;

    const json = await res.json();
    if (json.errors)
      return null;
    return json.data as T;
  }
  catch {
    return null;
  }
}

interface ProfileResponse {
  User: {
    id: number;
    name: string;
    siteUrl: string;
    avatar: { large: string };
    statistics: {
      anime: { count: number; episodesWatched: number; minutesWatched: number; meanScore: number };
      manga: { count: number; chaptersRead: number };
    };
  };
}

interface StatusResponse {
  MediaListCollection: {
    lists: Array<{
      entries: Array<{
        progress: number;
        score: number;
        media: {
          id: number;
          title: { romaji: string | null; english: string | null };
          coverImage: { large: string };
          siteUrl: string;
          episodes: number | null;
          format: string | null;
          meanScore: number | null;
          genres: string[];
          nextAiringEpisode: { airingAt: number; episode: number } | null;
        };
      }>;
    }>;
  };
}

export async function getAnilistProfile(username: string = ANILIST_USERNAME): Promise<AnilistProfile | null> {
  const data = await anilistFetch<ProfileResponse>(PROFILE_QUERY, { name: username });
  if (!data?.User)
    return null;

  const u = data.User;
  return {
    userId: u.id,
    username: u.name,
    siteUrl: u.siteUrl,
    avatarUrl: u.avatar.large,
    animeCount: u.statistics.anime.count,
    episodesWatched: u.statistics.anime.episodesWatched,
    minutesWatched: u.statistics.anime.minutesWatched,
    meanScore: u.statistics.anime.meanScore,
    mangaCount: u.statistics.manga.count,
    chaptersRead: u.statistics.manga.chaptersRead,
  };
}

export async function getAnilistWatching(
  userId: number,
  status: 'CURRENT' | 'PLANNING' = 'CURRENT',
): Promise<AnilistAnime[]> {
  const data = await anilistFetch<StatusResponse>(STATUS_QUERY, { id: userId, status });
  if (!data?.MediaListCollection?.lists)
    return [];

  return data.MediaListCollection.lists.flatMap(list =>
    list.entries.map((entry) => {
      const m = entry.media;
      const next = m.nextAiringEpisode;
      return {
        id: m.id,
        title: m.title.romaji ?? m.title.english ?? 'Unknown',
        coverImage: m.coverImage.large,
        siteUrl: m.siteUrl,
        progress: entry.progress,
        episodes: m.episodes,
        score: entry.score,
        meanScore: m.meanScore,
        format: m.format,
        genres: m.genres,
        nextEpisode: next?.episode ?? null,
        nextAiringAt: next?.airingAt ?? null,
      };
    }),
  );
}

interface FavouritesResponse {
  User: {
    favourites: {
      anime: {
        nodes: Array<{
          id: number;
          title: { romaji: string | null; english: string | null };
          siteUrl: string;
          coverImage: { large: string };
        }>;
      };
      characters: {
        nodes: Array<{
          id: number;
          name: { full: string };
          siteUrl: string;
          image: { large: string };
        }>;
      };
    };
  };
}

export interface AnilistFavourites {
  anime: AnilistFavourite[];
  characters: AnilistCharacter[];
}

export async function getAnilistFavourites(username: string = ANILIST_USERNAME): Promise<AnilistFavourites> {
  const data = await anilistFetch<FavouritesResponse>(FAVOURITES_QUERY, { name: username });
  if (!data?.User?.favourites)
    return { anime: [], characters: [] };

  const favs = data.User.favourites;
  return {
    anime: favs.anime.nodes.map(n => ({
      id: n.id,
      title: n.title.romaji ?? n.title.english ?? 'Unknown',
      siteUrl: n.siteUrl,
      coverImage: n.coverImage.large,
    })),
    characters: favs.characters.nodes.map(n => ({
      id: n.id,
      name: n.name.full,
      siteUrl: n.siteUrl,
      imageUrl: n.image.large,
    })),
  };
}
