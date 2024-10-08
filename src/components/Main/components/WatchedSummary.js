const average = (arr) =>
  arr.length > 0 ? arr.reduce((acc, cur) => acc + cur / arr.length, 0) : 0;

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => parseFloat(movie.imdbRating))
  );
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched.map((movie) => {
      const runtime = parseInt(movie.Runtime); // Extract number from string
      return isNaN(runtime) ? 0 : runtime; // Handle cases where runtime might not be a valid number
    })
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)} min</span>
        </p>
      </div>
    </div>
  );
}
export default WatchedSummary;
