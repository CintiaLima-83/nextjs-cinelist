import { getTrendingMovies } from "../api/tmdb";
import tmdbApi from "./axios";

jest.mock("./axios");

test("Retorna filme em destaque corretamente", async()=> {
    //AAA
   //Arrange
    const mockResults = [{id: 1, title: "Matrix"}];
    (tmdbApi.get as jest.Mock).mockResolvedValue({data: { results: mockResults }});
    //Act
     const filmes = await getTrendingMovies();
    //Assert
     expect(filmes).toEqual(mockResults);
})