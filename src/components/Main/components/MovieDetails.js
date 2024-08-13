import Loader from "./Loader";
import StarRating from "../../StarRating";

import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  // destructure movie
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const previousRating = isWatched
    ? watched.filter((movie) => movie.imdbID === selectedId)[0].userRating
    : null;

  useEffect(() => {
    document.title = `Movie | ${title}`;

    return () => (document.title = "usePopcorn");
  }, [title]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key !== "Escape") {
        return;
      }

      onCloseMovie();
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
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

  return (
    <div className="details">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched && (
                <p>
                  You previously rated this movie {previousRating}{" "}
                  <span>⭐️</span>
                </p>
              )}
              <StarRating maxRating={10} onSetRating={setRating} />
              {rating > 0 && (
                <button
                  className="btn-add"
                  onClick={() => onAddWatchedMovie(movieDetails, rating)}
                >
                  {isWatched ? "Update your rating" : "+ Add to list"}
                </button>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
export default MovieDetails;
