import Title from "@/app/components/Title";
import { getPopularMovies } from "@/app/lib/api/tmdb";
import Grid from "@/app/components/Grid";

export const revalidate = 60; //atualiza a cada 60sg

const FilmesPopulares = async() => {

    const filmes = await getPopularMovies();
    return(
        <>
        <Title title="Filmes Populares"/>
        <Grid filmes={filmes}/>
        </>
    )
}
export default FilmesPopulares;