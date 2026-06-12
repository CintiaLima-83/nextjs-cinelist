"use client";

import { useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const saved = localStorage.getItem("favorites");

    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (movieId: number) => {
    const updated = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  const isFavorite = (movieId: number) => {
    return favorites.includes(movieId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}