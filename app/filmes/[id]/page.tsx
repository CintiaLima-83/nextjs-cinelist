// Importações necessárias do Next.js e estilos
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image"; // ✅ usamos Image em vez de <img>
import styles from "./DetalheFilme.module.css";
import { getMoviesDetails, getMovieCredits, getMovieVideos } from "@/app/lib/api/tmdb";

// Tipagem dos parâmetros recebidos
type Props = {
  params: Promise<{
    id: number;
  }>;
};

// Tipos explícitos para evitar "any"
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

// Função que gera metadados da página (SEO)
export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;
  const details = await getMoviesDetails(id);

  if (!details) return;

  return {
    title: `${details.title} | Cinelista`,
    description: details.overview,
  };
};

// Componente principal da página de detalhes
const DetalheFilme = async ({ params }: Props) => {
  const { id } = await params;

  // ✅ Busca detalhes, elenco e vídeos em paralelo
  const [details, credits, videos] = await Promise.all([
    getMoviesDetails(id),
    getMovieCredits(id),
    getMovieVideos(id),
  ]);

  if (!details) return notFound();

  const { title, poster_path, overview } = details;

  // ✅ Tipagem correta para elenco
  const elenco: Actor[] = credits?.cast?.slice(0, 5) ?? [];

  // ✅ Tipagem correta para trailer (aceita Trailer ou Teaser)
  const trailer: Video | undefined = videos?.results?.find(
    (v: Video) => (v.type === "Trailer" || v.type === "Teaser") && v.site === "YouTube"
  );

  return (
    <div className={styles.detalhes}>
      <div className={styles.detalhes_container}>
        {/* Link para voltar à página inicial */}
        <Link className={styles.detalhes_voltar} href="/">Voltar</Link>
        <section>
          <figure>
            {/* ✅ Uso de Image do Next.js em vez de <img> */}
            <Image
              className={styles.detalhes_image}
              src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
              alt={`Poster do filme: ${title}`}
              width={300}
              height={450}
            />
          </figure>
          <article className={styles.detalhes_info}>
            <h2>{title}</h2>
            <p>{overview}</p>

            <h3>Elenco</h3>
            {/* ✅ Fallback: se não houver elenco, mostra mensagem */}
            {elenco.length > 0 ? (
              <ul className={styles.elenco}>
                {elenco.map((actor) => (
                  <li key={actor.id}>
                    <strong>{actor.name}</strong> como {actor.character}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Elenco não disponível.</p>
            )}

            {/* ✅ Fallback: se não houver trailer, mostra mensagem */}
            {trailer ? (
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
            ) : (
              <p>Trailer não disponível.</p>
            )}
          </article>
        </section>
      </div>
    </div>
  );
};

export default DetalheFilme;
