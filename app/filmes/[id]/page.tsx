import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./DetalheFilme.module.css";
import {
  getMoviesDetails,
  getMovieCredits,
  getMovieVideos,
} from "@/app/lib/api/tmdb";

type Actor = {
  id: number;
  name: string;
  character: string;
};

type Video = {
  type: string;
  site: string;
  key: string;
};

type Genre = {
  id: number;
  name: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const details = await getMoviesDetails(Number(id));

  if (!details) return;

  return {
    title: `${details.title} | Cinelista`,
    description: details.overview,
  };
}

export default async function DetalheFilme({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const filmeId = Number(id);

  const [details, credits, videos] = await Promise.all([
    getMoviesDetails(filmeId),
    getMovieCredits(filmeId),
    getMovieVideos(filmeId),
  ]);

  if (!details) {
    return notFound();
  }

  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    genres,
  } = details;

  const elenco: Actor[] = credits?.cast?.slice(0, 5) ?? [];

  const trailer: Video | undefined = videos?.results?.find(
    (v: Video) =>
      (v.type === "Trailer" || v.type === "Teaser") &&
      v.site === "YouTube"
  );

  return (
    <div className={styles.detalhes}>
      <div className={styles.detalhes_background}>
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
          alt={title}
          fill
          priority
        />
      </div>

      <div className={styles.detalhes_overlay}></div>

      <div className={styles.detalhes_info}>
        <Link href="/" className={styles.detalhes_voltar}>
          ← Voltar
        </Link>

        <h2>{title}</h2>

        <p>{overview}</p>

        <div className={styles.movie_meta}>
          <p>
            ⭐ Nota: {vote_average?.toFixed(1)}
          </p>

          <p>
            📅 Lançamento:{" "}
            {new Date(release_date).toLocaleDateString("pt-BR")}
          </p>

          {genres && genres.length > 0 && (
            <p>
              🎭 Gêneros:{" "}
              {genres
                .map((genre: Genre) => genre.name)
                .join(", ")}
            </p>
          )}
        </div>

        <h3>Elenco</h3>

        {elenco.length > 0 ? (
          <ul className={styles.elenco}>
            {elenco.map((actor) => (
              <li key={actor.id}>
                <strong>{actor.name}</strong> como{" "}
                {actor.character}
              </li>
            ))}
          </ul>
        ) : (
          <p>Elenco não disponível.</p>
        )}

        <h3>Trailer</h3>

        {trailer ? (
          <div className={styles.trailer}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <p>Trailer não disponível.</p>
        )}
      </div>
    </div>
  );
}