const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query: string) {
  if (!query) return [];

  const url = `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${
    process.env.NEXT_PUBLIC_OMDB_KEY
  }`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = await res.json();
  if (data.Response === "False") return data;

  return data;
}

export async function getMovieDetails(id: string) {
  if (!id) throw new Error("Movie ID is required");

  const url = `${BASE_URL}?i=${encodeURIComponent(id)}&apikey=${
    process.env.NEXT_PUBLIC_OMDB_KEY
  }`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch movie details");

  const data = await res.json();
  if (data.Response === "False")
    throw new Error(data.Error || "Movie not found");

  return data;
}
