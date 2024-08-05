import { useState } from "react";

import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import SearchBar from "./components/NavBar/components/SearchBar";
import NumResults from "./components/NavBar/components/NumResults";
import ListBox from "./components/Main/components/ListBox/ListBox";
import WatchedBox from "./components/Main/components/WatchedBox/WatchedBox";
import MovieList from "./components/Main/components/ListBox/components/MovieList";

import { tempMovieData } from "./data/tempData";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
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
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}
