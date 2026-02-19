import { Filme } from "../../types/types";
import tmdbApi from "./axios";

type Data = {
  results: Filme[];
};

// Busca filmes em alta na semana
export const getTrendingMovies = async (): Promise<Filme[]> => {
  const res = await tmdbApi.get<Data>("/trending/movie/week?language=pt-BR");
  return res.data.results;
};

// Busca detalhes de um filme específico
export const getMoviesDetails = async (id: number): Promise<Filme | null> => {
  try {
    const res = await tmdbApi.get<Filme>(`/movie/${id}?language=pt-BR`);
    return res.data;
  } catch {
    return null;
  }
};

// Busca filmes em alta na semana
export const getNowPlaying = async (): Promise<Filme[]> => {
  const res = await tmdbApi.get<Data>("/movie/now_playing?language=pt-BR");
  return res.data.results;
};

// Busca filmes em alta na semana
export const getPopularMovies= async (): Promise<Filme[]> => {
  const res = await tmdbApi.get<Data>("/movie/popular?language=pt-BR");
  return res.data.results;
};

// Busca filmes em alta na semana
export const getTopMovies= async (): Promise<Filme[]> => {
  const res = await tmdbApi.get<Data>("/movie/top_rated?language=pt-BR");
  return res.data.results;
};
