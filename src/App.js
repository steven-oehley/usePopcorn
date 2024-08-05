import { useState } from "react";

import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import SearchBar from "./components/NavBar/components/SearchBar";
import Logo from "./components/NavBar/components/Logo";
import NumResults from "./components/NavBar/components/NumResults";

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
      <Main movies={movies} />
    </>
  );
}
