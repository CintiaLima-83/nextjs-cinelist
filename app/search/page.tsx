import Grid from "@/app/components/Grid";
import Title from "@/app/components/Title";
import { searchMovies } from "@/app/lib/api/tmdb";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: Props) {
  const { q } = await searchParams;

  const filmes = q
    ? await searchMovies(q)
    : [];

  return (
    <>
      <Title title={`Resultados para: ${q}`} />

      {filmes.length > 0 ? (
        <Grid filmes={filmes} />
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1rem",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
              fontSize: "2rem",
            }}
          >
            🎬 Nenhum filme encontrado
          </h2>

          <p
            style={{
              color: "#999",
            }}
          >
            Tente pesquisar com outro nome.
          </p>
        </div>
      )}
    </>
  );
}