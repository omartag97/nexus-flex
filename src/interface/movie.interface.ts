export interface MovieSearchItem {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface OmdbResponse {
  Search?: MovieSearchItem[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}
