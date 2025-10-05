import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movies.api";
import { MovieSearchItem } from "@/interface/movie.interface";

// Define the OMDb API response type
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
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
