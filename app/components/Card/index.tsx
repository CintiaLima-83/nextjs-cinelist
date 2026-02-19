import { Filme } from "@/app/types/types";
import styles from "./Card.module.css";
import Link from "next/link";

type Props = {
  filme: Filme;
};

const Card = ({ filme }: Props) => {
  const { id, title, poster_path, overview, vote_average } = filme;
 const resume = overview?.length >= 256 ? `${overview.substring(0, 253)}...` : overview;

  return (
    <div className={styles.card} key={id}>
      <Link href={`/filmes/${id}`}>
        <div>
          <img
            className={styles.card_poster}
            src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
            alt={`Poster do filme ${title}`}
            width={300}
            height={200}
          />
          <div className={styles.card_info}>
            <h3 className={styles.card_title}>{title}</h3>
            <p className={styles.card_description}>{resume}</p>
            <p className={styles.card_description}>Nota: {vote_average}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
