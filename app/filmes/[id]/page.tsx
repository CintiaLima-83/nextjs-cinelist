
import Link from "next/link";
import {notFound} from "next/navigation";
import styles from "./DetalheFilme.module.css";
import { getMoviesDetails } from "@/app/lib/api/tmdb";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export const generateMetadata = async({params}: Props) => {

  const { id } = await params;
 //fazer chamada API
  const details = await getMoviesDetails(id);


  if(!details)
    return;

  return {
    title: `${details.title} | Cinelista`,
    description: details.overview
  }

}

const DetalheFilme = async ({ params }: Props) => {
  const { id } = await params;
 //fazer chamada API
  const details = await getMoviesDetails(id);


  if(!details)
    return notFound();

  const {title, poster_path, overview} = details;

  return (
    <>
      <div className={styles.detalhes}>
        <div className={styles.detalhes_container}>
        <Link className={styles.detalhes_voltar} href="/">Voltar</Link>
        <section>
          <figure>
            <img
            className={styles.detalhes_image}
              src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
              alt={'Poster do filme: ${title}'}
            />
          </figure>
          <article className={styles.detalhes_info}>
            <h2>{title}</h2>
            <p>{overview}</p>
          </article>
        </section>
        </div>
      </div>
    </>
  );
};

export default DetalheFilme;
