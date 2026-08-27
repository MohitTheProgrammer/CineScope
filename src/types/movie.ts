export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres?: string[];
  orientation?: "vertical" | "horizontal"
}

export interface WatchProvider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export interface WatchProviders {
    ads?: WatchProvider[];
    free?: WatchProvider[];
    flatrate?: WatchProvider[];
    rent?: WatchProvider[];
    buy?: WatchProvider[];
    link?: string;
}