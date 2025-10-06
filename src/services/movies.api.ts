import axios from "axios";

const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query: string) {
  if (!query) return [];

  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        s: query,
        apikey: process.env.NEXT_PUBLIC_OMDB_KEY,
      },
    });

    if (data.Response === "False") return [];
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Failed to fetch movies");
    }
  }
}

export async function getMovieDetails(id: string) {
  if (!id) throw new Error("Movie ID is required");

  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        i: id,
        apikey: process.env.NEXT_PUBLIC_OMDB_KEY,
      },
    });

    if (data.Response === "False")
      throw new Error(data.Error || "Movie not found");

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Failed to fetch movie details");
    }
  }
}
