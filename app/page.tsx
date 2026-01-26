import Grid from "./components/Grid";
import Title from "./components/Title";
import {filmes} from "./lib/filmes";

export default function Home() {
  return (
    <>
    <Title title="Filmes em destaque"/>
    <Grid filmes={filmes}/>
    </>
  );
}
