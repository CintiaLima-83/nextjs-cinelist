import { Filme } from "../../types/types";
import tmdbApi from "./axios";
import { AxiosError } from "axios";

type Data = {
  results: Filme[];
};

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}

// Filmes em alta na semana
export const getTrendingMovies = async (): Promise<Filme[]> => {
  const res = await tmdbApi.get<Data>("/trending/movie/week?language=pt-BR");
  return res.data.results;
};

// Detalhes de um filme específico
export const getMoviesDetails = async (id: number): Promise<Filme | null> => {
  try {
    const res = await tmdbApi.get<Filme>(`/movie/${id}?language=pt-BR`);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null; // só se o filme não existe
    }
    throw error; // outros erros não viram "não encontrado"
  }
};

// Filmes em cartaz
export const getNowPlaying = async (): Promise<Filme[]> => {
  const res = await tmdbApi.get<Data>("/movie/now_playing?language=pt-BR");
  return res.data.results;
};

// Filmes populares
export const getPopularMovies = async (): Promise<Filme[]> => {
  const res = await tmdbApi.get<Data>("/movie/popular?language=pt-BR");
  return res.data.results;
};

// Filmes top rated
export const getTopMovies = async (): Promise<Filme[]> => {
  const res = await tmdbApi.get<Data>("/movie/top_rated?language=pt-BR");
  return res.data.results;
};

// Elenco (créditos)
export const getMovieCredits = async (id: number) => {
  try {
    const res = await tmdbApi.get(`/movie/${id}/credits?language=pt-BR`);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return { cast: [] };
    }
    throw error;
  }
};

// Vídeos (trailers)
export const getMovieVideos = async (id: number) => {
  try {
    const res = await tmdbApi.get(`/movie/${id}/videos?language=pt-BR`);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return { results: [] };
    }
    throw error;
  }
};

// Busca por query
export const searchMovies = async (query: string): Promise<Filme[]> => {
  const res = await tmdbApi.get<Data>(
    `/search/movie?language=pt-BR&query=${encodeURIComponent(query)}`
  );
  return res.data.results;
};
