import ListBox from "./components/ListBox/ListBox";
import WatchedBox from "./components/WatchedBox/WatchedBox";

function Main({ movies }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  );
}
export default Main;
