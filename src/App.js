import { useEffect, useState } from "react";

import useDebounce from "./hooks/useDebounce";

import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import SearchBar from "./components/NavBar/components/SearchBar";
import NumResults from "./components/NavBar/components/NumResults";
import Box from "./components/Box";
import MovieList from "./components/Main/components/MovieList";
import WatchedSummary from "./components/Main/components/WatchedSummary";
import WatchedList from "./components/Main/components/WatchedList";
import Loader from "./components/Main/components/Loader";
import MovieDetails from "./components/Main/components/MovieDetails";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    const storedMovies = localStorage.getItem("watchedMovies");
    return JSON.parse(storedMovies);
  });

  const debouncedQuery = useDebounce(inputValue, 500);

  const containsId = (id) => watched.some((movie) => movie.imdbID === id);

  const handleCloseMovie = () => setSelectedId(null);

  const handleSelectMovie = (id) =>
    selectedId === id ? setSelectedId(null) : setSelectedId(id);

  const handleDuplicateRating = (movieToAdd, userRating) => {
    setWatched((prevMovies) =>
      prevMovies.map((movie) =>
        movie.imdbID === movieToAdd.imdbID ? { ...movie, userRating } : movie
      )
    );
    handleCloseMovie();
  };

  const handleRating = (movieToAdd, userRating) => {
    setWatched((prevMovies) => [...prevMovies, { ...movieToAdd, userRating }]);
    handleCloseMovie();
  };

  const handleAddWatchedMovie = (movieToAdd, userRating) => {
    if (containsId(movieToAdd.imdbID)) {
      handleDuplicateRating(movieToAdd, userRating);
      return;
    }

    handleRating(movieToAdd, userRating);
  };

  const handleDeleteMovie = (id) =>
    setWatched((previousWatched) =>
      previousWatched.filter((movie) => movie.imdbID !== id)
    );

  useEffect(() => {
    setQuery(debouncedQuery); // Update the query state when debounced value changes
  }, [debouncedQuery]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      if (!query) return; // Do nothing if query is empty
      try {
        setError("");
        setIsLoading(true);
        const response = await fetch(`${apiUrl}?apikey=${apiKey}&s=${query}`, {
          signal: controller.signal,
        });
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
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <NavBar>
        <SearchBar
          className="search"
          placeholder="Search movies..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && error && <p className="error">⛔️ - {error}</p>}
          {!isLoading && !error && movies && movies.length === 0 && (
            <p className="error">No movies found...</p>
          )}
          {!isLoading && !error && movies && movies.length > 0 && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
