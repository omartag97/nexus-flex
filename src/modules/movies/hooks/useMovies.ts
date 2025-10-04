import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movies.api";

export function useMovies(query: string) {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });
}
