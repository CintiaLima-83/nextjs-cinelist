"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleSearch = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(
      `/search?q=${encodeURIComponent(
        search
      )}`
    );

    setSearch("");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={styles.header_logo}>
          <Link href="/">Cinelista</Link>
        </h1>

        <nav className={styles.header_nav}>
          <Link href="/">Início</Link>
          <Link href="/filmes/em-alta">
            Em alta
          </Link>
          <Link href="/filmes/populares">
            Populares
          </Link>
          <Link href="/filmes/top">
            Top filmes
          </Link>
        </nav>

        <form
          onSubmit={handleSearch}
          className={styles.search_form}
        >
          <input
            type="text"
            placeholder="Buscar filme..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className={styles.search_input}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;