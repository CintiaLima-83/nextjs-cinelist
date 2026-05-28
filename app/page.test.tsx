// Extensão do Jest DOM: adicionar matchers como "toBeInTheDocument"
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { getTrendingMovies } from "./lib/api/tmdb";
import { ComponentProps } from "react";

// Mock da API
jest.mock("./lib/api/tmdb", () => ({
  getTrendingMovies: jest.fn(),
}));

// ✅ Mock do Next/Image com tipagem correta (sem any)
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ComponentProps<"img">) => {
    // Renderiza como <img> simples nos testes
    return <img {...props} alt={props.alt || "mock image"} />;
  },
}));

// ✅ Define variável de ambiente para testes
beforeAll(() => {
  process.env.NEXT_PUBLIC_TMDB_API_IMG_URL = "https://image.tmdb.org/t/p/w500";
});

test("Exibe o titulo 'filmes em destaques' na página inicial corretamente", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([
    { id: 1, title: "Filme teste 1", overview: "Um resumo qualquer", poster_path: "/next.svg" },
    { id: 2, title: "Filme teste 2", overview: "Outro resumo qualquer", poster_path: "/next.svg" },
  ]);

  const ui = await Home(); // Home é async
  render(ui);

  expect(screen.getByText("Destaque")).toBeInTheDocument();
  expect(screen.getByText("Filme teste 1")).toBeInTheDocument();
  expect(screen.getByText("Filme teste 2")).toBeInTheDocument();
});

test("Renderiza os filmes em destaque corretamente", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([
    {
      id: 1,
      title: "Filme teste",
      overview: "Resumo teste",
      poster_path: "/next.svg", // ✅ começa com "/"
      vote_average: 0.0,
    },
  ]);

  render(await Home());
  expect(await screen.findByText("Filme teste")).toBeInTheDocument();
});

test("Renderiza filmes quando disponíveis", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([
    {
      id: 1,
      title: "Filme teste",
      overview: "Resumo teste",
      poster_path: "/next.svg",
      vote_average: 0.0,
    },
  ]);

  render(await Home());
  expect(await screen.findByText("Filme teste")).toBeInTheDocument();
});

test("Exibe mensagem quando não há filmes", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([]);

  render(await Home());
  expect(await screen.findByText("Nenhum filme encontrado.")).toBeInTheDocument();
});
