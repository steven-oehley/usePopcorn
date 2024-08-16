import Loader from "./Loader";
import StarRating from "../../StarRating";
import { useEffect, useState } from "react";
import { useFetchMovie } from "../../../hooks/useFetchMovie";

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}) {
  const [rating, setRating] = useState(0);

  const { movieDetails, isLoading } = useFetchMovie(selectedId);

  // Destructure movie details
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

  const watchedMovie = watched.find((movie) => movie.imdbID === selectedId);
  const isWatched = !!watchedMovie;
  const previousRating = isWatched ? watchedMovie.userRating : null;
  const ratingCount = isWatched ? watchedMovie.numberPrevRatings : 0;

  useEffect(() => {
    if (title) document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        onCloseMovie();
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [onCloseMovie]);

  const handleRateMovie = () => {
    const newRatingCount = ratingCount + 1;
    onAddWatchedMovie(movieDetails, rating, newRatingCount);
  };

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
              <div className="flex flex-col justify-between">
                {isWatched && (
                  <p>
                    You last rated this movie {previousRating} <span>⭐️</span>
                  </p>
                )}
                {ratingCount > 0 && (
                  <p>
                    You have previously rated this movie {ratingCount}{" "}
                    {`time${ratingCount > 1 ? "s" : ""}`}
                  </p>
                )}
              </div>
              <StarRating maxRating={10} onSetRating={setRating} />
              {rating > 0 && (
                <button className="btn-add" onClick={handleRateMovie}>
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
