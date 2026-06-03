"use client";

import { Filme } from "../../types/types";
import PosterCarousel from "../Carousel/PosterCarousel";
import Grid from "../Grid";
import Title from "../Title";

interface SearchBarWrapperProps {
  initialMovies: Filme[];
}

export default function SearchBarWrapper({ initialMovies }: SearchBarWrapperProps) {
  return (
    <>
      <PosterCarousel filmes={initialMovies} />
      <Title title="Destaque" />
      {initialMovies && initialMovies.length > 0 ? (
        <Grid filmes={initialMovies} />
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </>
  );
}
