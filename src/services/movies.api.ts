import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";

import { useQuery } from "@tanstack/react-query";

import { MovieSearchItem, OmdbResponse } from "@/interface/movie.interface";

export async function searchMovies(query: string) {
  if (!query) return [];

  try {
    const { data } = await axiosInstance.get("/", { params: { s: query } });
    if (data.Response === "False") return [];
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new Error(error.message);
    if (error instanceof Error) throw error;
    throw new Error("Failed to fetch movies");
  }
}

export async function getMovieDetails(id: string) {
  if (!id) throw new Error("Movie ID is required");

  try {
    const { data } = await axiosInstance.get("/", { params: { i: id } });
    if (data.Response === "False")
      throw new Error(data.Error || "Movie not found");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new Error(error.message);
    if (error instanceof Error) throw error;
    throw new Error("Failed to fetch movie details");
  }
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
