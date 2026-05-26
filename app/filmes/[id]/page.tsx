
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./DetalheFilme.module.css";
import { getMoviesDetails, getMovieCredits, getMovieVideos } from "@/app/lib/api/tmdb";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;
  const details = await getMoviesDetails(id);

  if (!details) return;

  return {
    title: `${details.title} | Cinelista`,
    description: details.overview,
  };
};

const DetalheFilme = async ({ params }: Props) => {
  const { id } = await params;

  // Buscar detalhes, elenco e vídeos em paralelo
  const [details, credits, videos] = await Promise.all([
    getMoviesDetails(id),
    getMovieCredits(id),
    getMovieVideos(id),
  ]);

  if (!details) return notFound();

  const { title, poster_path, overview } = details;

  // Pegar os 5 primeiros atores
  const elenco = credits?.cast?.slice(0, 5);

  // Procurar trailer oficial no YouTube
  const trailer = videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className={styles.detalhes}>
      <div className={styles.detalhes_container}>
        <Link className={styles.detalhes_voltar} href="/">Voltar</Link>
        <section>
          <figure>
            <img
              className={styles.detalhes_image}
              src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
              alt={`Poster do filme: ${title}`}
            />
          </figure>
          <article className={styles.detalhes_info}>
            <h2>{title}</h2>
            <p>{overview}</p>

            <h3>Elenco</h3>
            <ul className={styles.elenco}>
              {elenco?.map((actor: any) => (
                <li key={actor.id}>
                  <strong>{actor.name}</strong> como {actor.character}
                </li>
              ))}
            </ul>

            {trailer && (
              <div className={styles.trailer}>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </article>
        </section>
      </div>
    </div>
  );
};

export default DetalheFilme;
