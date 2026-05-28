// Importações necessárias
import { Filme } from "@/app/types/types"; 
import styles from "./Card.module.css";
import Link from "next/link";
import { useResumoFilme } from "@/app/hooks/useResumoFilme";
import Image from "next/image"; 

// Tipagem explícita das props
type Props = {
  filme: Filme;
};

const Card = ({ filme }: Props) => {
  // Desestruturação das propriedades do filme
  const { id, title, poster_path, overview, vote_average } = filme;
  
  // Hook para resumir a descrição do filme
  const resume = useResumoFilme(overview, 256);

  return (
    <div className={styles.card} key={id}>
      <Link href={`/filmes/${id}`}>
        <div>
      
          <Image
            className={styles.card_poster}
            src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
            alt={`Poster do filme ${title}`}
            width={300}   // largura fixa para otimização
            height={200}  // altura fixa para otimização
          />
          <div className={styles.card_info}>
            {/* Título do filme */}
            <h3 className={styles.card_title}>{title}</h3>
            {/* Resumo da sinopse */}
            <p className={styles.card_description}>{resume}</p>
            {/* Nota média do filme */}
            <p className={styles.card_description}>Nota: {vote_average}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
