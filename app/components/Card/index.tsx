import { Filme } from "@/app/types/types";
import styles from "./Card.module.css";
import Link from "next/link";
import { useResumoFilme } from "@/app/hooks/useResumoFilme";
import Image from "next/image";
import FavoriteButton from "../FavoriteButton";

type Props = {
  filme: Filme;
};

const Card = ({ filme }: Props) => {
  const { id, title, poster_path, overview, vote_average, release_date } =
    filme;

  const resumo = useResumoFilme(overview, 100);

  return (
    <div className={styles.card}>
      <FavoriteButton movieId={id} />
      
      <Link href={`/filmes/${id}`}>
        <Image
          className={styles.card_poster}
          src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
          alt={`Poster do filme ${title}`}
          width={300}
          height={450}
        />

        <div className={styles.card_info}>
          <h3 className={styles.card_title}>{title}</h3>

          <p className={styles.card_rating}>⭐ {vote_average.toFixed(1)}</p>

          <p className={styles.card_date}>
            📅 {new Date(release_date).getFullYear()}
          </p>

          <p className={styles.card_overview}>{resumo}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
