import { getTrendingMovies } from "./lib/api/tmdb";
import SearchBarWrapper from "./components/Bar/SearchBarWrapper";

export default async function Home() {
  const filmes = await getTrendingMovies();
  return <SearchBarWrapper initialMovies={filmes} />;
}
