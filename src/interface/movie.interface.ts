export interface MovieResponse {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Writer?: string;
  Director?: string;
  Actors?: string;
  imdbRating?: string;
  Runtime?: string;
  Released?: string;
  Genre?: string;
}

export interface MovieSearchItem {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieSearchResponse {
  Search?: MovieSearchItem[];
  totalResults?: string;
  Response: string;
}
