import { useEffect, useState } from "react";

export function useFetchMovies(query, handleCloseMovie) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_URL = process.env.REACT_APP_API_URL;
    const controller = new AbortController();
    async function fetchMovies() {
      if (!query) return; // Do nothing if query is empty
      try {
        setError("");
        setIsLoading(true);
        const response = await fetch(
          `${API_URL}?apikey=${API_KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong with fetching the data");
        }
        const data = await response.json();
        setMovies(data.Search || []); // Ensure movies is always an array
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    handleCloseMovie();
    fetchMovies();

    return () => controller.abort();
  }, [query, handleCloseMovie]);

  return { movies, isLoading, error };
}
