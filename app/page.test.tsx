import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { getTrendingMovies } from "./lib/api/tmdb";
import { ComponentProps } from "react";

// Mock da API
jest.mock("./lib/api/tmdb", () => ({
  getTrendingMovies: jest.fn(),
}));

// Mock do Next/Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ComponentProps<"img">) => {
    return <img {...props} alt={props.alt || "mock image"} />;
  },
}));

beforeAll(() => {
  process.env.NEXT_PUBLIC_TMDB_API_IMG_URL =
    "https://image.tmdb.org/t/p/w500";
});

test("Exibe o título 'Destaque' na página inicial corretamente", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([
    {
      id: 1,
      title: "Filme teste 1",
      overview: "Um resumo qualquer",
      poster_path: "/next.svg",
      vote_average: 8.5,
      release_date: "2024-01-01",
    },
    {
      id: 2,
      title: "Filme teste 2",
      overview: "Outro resumo qualquer",
      poster_path: "/next.svg",
      vote_average: 7.9,
      release_date: "2023-05-10",
    },
  ]);

  render(await Home());

  expect(screen.getByText("Destaque")).toBeInTheDocument();

  expect(
    screen.getAllByText("Filme teste 1")
  ).toHaveLength(2);

  expect(
    screen.getAllByText("Filme teste 2")
  ).toHaveLength(2);
});

test("Renderiza os filmes em destaque corretamente", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([
    {
      id: 1,
      title: "Filme teste",
      overview: "Resumo teste",
      poster_path: "/next.svg",
      vote_average: 8.5,
      release_date: "2024-01-01",
    },
  ]);

  render(await Home());

  expect(
    screen.getAllByText("Filme teste")
  ).toHaveLength(2);
});

test("Renderiza filmes quando disponíveis", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([
    {
      id: 1,
      title: "Filme teste",
      overview: "Resumo teste",
      poster_path: "/next.svg",
      vote_average: 8.5,
      release_date: "2024-01-01",
    },
  ]);

  render(await Home());

  expect(
    screen.getAllByText("Filme teste")
  ).toHaveLength(2);
});

test("Exibe mensagem quando não há filmes", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([]);

  render(await Home());

  expect(
    await screen.findByText("Nenhum filme encontrado.")
  ).toBeInTheDocument();
});