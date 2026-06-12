"use client";

import styles from "./FavoriteButton.module.css";
import { useFavorites } from "@/app/hooks/useFavorites";

type Props = {
  movieId: number;
};

export default function FavoriteButton({
  movieId,
}: Props) {
  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(movieId);

  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(movieId);
      }}
    >
      {favorite ? "❤️" : "🤍"}
    </button>
  );
}