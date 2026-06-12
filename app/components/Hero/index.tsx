import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1>🎬 Descubra os melhores filmes</h1>

        <p>
          Explore filmes em alta, populares e os mais bem avaliados do momento.
        </p>

        <span>Dados atualizados em tempo real através da API TMDB.</span>
      </div>
    </section>
  );
} 

export default Hero;
