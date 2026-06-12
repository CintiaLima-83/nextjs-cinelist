import { getTrendingMovies } from "./lib/api/tmdb";
import SearchBarWrapper from "./components/Bar/SearchBarWrapper";
import Hero from "./components/Hero";

export default async function Home() {
  const filmes = await getTrendingMovies();

  return (
    <>
      <Hero />
      <SearchBarWrapper initialMovies={filmes} />
    </>
  );
}