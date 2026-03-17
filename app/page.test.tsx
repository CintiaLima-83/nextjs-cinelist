//Extensão do Jest DOM: adicionar matchers como "toBeInTheDocument"
import "@testing-library/jest-dom";
//Importa a função que será mackada
import { getTrendingMovies } from "./lib/api/tmdb";

import { render, screen } from "@testing-library/react"
import Home from "./page"

jest.mock("./lib/api/tmdb", () => ({
    getTrendingMovies: jest.fn().mockResolvedValue([
        {id: 1, title: "Filme teste 1", overview: "Um resumo qualquer" },
        {id: 2, title: "Filme teste 2", overview: "Outro resumo qualquer"},
    ]),//retorna um mock dessa função
}));


test("Exibe o titulo 'filmes em destaques' na página inicial corretamente", async ()=> {
    const ui = await Home(); // Home é async
    render(ui);


    //Verifica se o titulo da seção aparece corretamente
    expect(screen.getByText("Destaque")).toBeInTheDocument();

    //Verifica se os filmes mackados aparecem
    expect(screen.getByText("Filme teste 1")).toBeInTheDocument();
    expect(screen.getByText("Filme teste 2")).toBeInTheDocument();

});

test("Renderiza os filmes em destaque corretamente", async () => {
    (getTrendingMovies as jest.Mock).mockResolvedValue([   {
     id: 1,
     title: "Filme teste",
     overview: "Resumo teste",
     poster_path: "public/next.svg",
     vote_average: 0.0,
   },
    ]);

    //Renderiza a págine (internamente chama a função getTrendingMovies)
    render(await Home());
    //Verificar se o titulo renderizado aparece na tela
    expect(await screen.findByText("Filme teste")).toBeInTheDocument();
});

test("Renderiza filmes quando disponíveis", async () => {
  (getTrendingMovies as jest.Mock).mockResolvedValue([
    {
      id: 1,
      title: "Filme teste",
      overview: "Resumo teste",
      poster_path: "public/next.svg",
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
