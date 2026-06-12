import Link from "next/link";
import Title from "../components/Title";

const NotFound = () => {
  return (
    <div style={{ padding: "3rem" }}>
      <Title title="Filme não encontrado" />

      <p>
        O filme solicitado não existe ou foi removido.
      </p>

      <br />

      <Link href="/">
        ← Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;