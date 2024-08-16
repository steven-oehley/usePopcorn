import { useCallback, useEffect, useState } from "react";

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
import { useFetchMovies } from "./hooks/useFetchMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    const storedMovies = localStorage.getItem("watchedMovies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  const debouncedQuery = useDebounce(inputValue, 500);

  const containsId = (id) => watched.some((movie) => movie.imdbID === id);

  const handleCloseMovie = useCallback(() => setSelectedId(null), []);

  const { movies, isLoading, error } = useFetchMovies(query, handleCloseMovie);

  const handleSelectMovie = (id) =>
    selectedId === id ? setSelectedId(null) : setSelectedId(id);

  const handleDuplicateRating = (movieToAdd, userRating, numRatings) => {
    setWatched((prevMovies) =>
      prevMovies.map((movie) =>
        movie.imdbID === movieToAdd.imdbID
          ? { ...movie, userRating, numberPrevRatings: numRatings }
          : movie
      )
    );
    handleCloseMovie();
  };

  const handleRating = (movieToAdd, userRating, numRatings) => {
    setWatched((prevMovies) => [
      ...prevMovies,
      { ...movieToAdd, userRating, numberPrevRatings: numRatings },
    ]);
    handleCloseMovie();
  };

  const handleAddWatchedMovie = (movieToAdd, userRating, numRatings) => {
    if (containsId(movieToAdd.imdbID)) {
      handleDuplicateRating(movieToAdd, userRating, numRatings);
      return;
    }

    handleRating(movieToAdd, userRating, numRatings);
  };

  const handleDeleteMovie = (id) =>
    setWatched((previousWatched) =>
      previousWatched.filter((movie) => movie.imdbID !== id)
    );

  useEffect(() => {
    setQuery(debouncedQuery); // Update the query state when debounced value changes
  }, [debouncedQuery]);

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
        <Box key={query + movies.length1}>
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
