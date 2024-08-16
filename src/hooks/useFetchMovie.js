import { useEffect, useState } from "react";

export function useFetchMovie(selectedId) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setMovieDetails({}); // Reset previous movie details

        const response = await fetch(
          `${apiUrl}?apikey=${apiKey}&i=${selectedId}`
        );

        if (!response.ok) {
          throw new Error("An error occurred fetching the movie details");
        }

        const movieData = await response.json();
        setMovieDetails(movieData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedId) {
      fetchMovieDetails();
    }
  }, [selectedId]);

  return { movieDetails, isLoading };
}
