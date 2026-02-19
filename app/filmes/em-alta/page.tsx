import Title from "@/app/components/Title";
import { getPopularMovies } from "@/app/lib/api/tmdb";
import Grid from "@/app/components/Grid";

export const dynamic = `force-dynamic`;

const FilmesEmAlta = async () => {

    const filmes = await getPopularMovies();
    return(
        <>
        <Title title="Filmes em alta"/>
        <Grid filmes={filmes}/>
        </>
    )
}
export default FilmesEmAlta;