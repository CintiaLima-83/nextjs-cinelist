import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Desenvolvido por Cintia Lima
      </p>

      <p>
        Next.js • TypeScript • TMDB API
      </p>
    </footer>
  );
};

export default Footer;