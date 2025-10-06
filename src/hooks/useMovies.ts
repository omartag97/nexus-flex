import { useQuery } from "@tanstack/react-query";

import { searchMovies } from "@/services/movies.api";

import { MovieSearchItem } from "@/interface/movie.interface";

interface OmdbResponse {
  Search?: MovieSearchItem[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

export function useMovies(query: string) {
  return useQuery<MovieSearchItem[], Error>({
    queryKey: ["movies", query],
    queryFn: async () => {
      if (!query) return [];
      const res: OmdbResponse = await searchMovies(query);

      if (res.Response === "False") return [];
      return res.Search ?? [];
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
