import { tempWatchedData, tempMovieData } from "./data/tempData";

import { useState } from "react";

import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import SearchBar from "./components/NavBar/components/SearchBar";
import NumResults from "./components/NavBar/components/NumResults";
import Box from "./components/Box";
import MovieList from "./components/Main/components/MovieList";
import WatchedSummary from "./components/Main/components/WatchedSummary";
import WatchedList from "./components/Main/components/WatchedList";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  return (
    <>
      <NavBar>
        <SearchBar
          className="search"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
