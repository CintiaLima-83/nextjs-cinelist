import Title from "@/app/components/Title";
import { getTopMovies } from "@/app/lib/api/tmdb";
import Grid from "@/app/components/Grid"

export const dynamic = `force-static`;

const TopFilmes = async() => {

    const filmes = await getTopMovies();

    return(
        <>
        <Title title="Top Filmes"/>
        <Grid filmes={filmes}/>
        </>
    )
}
export default TopFilmes;