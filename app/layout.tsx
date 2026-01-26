import type { Metadata } from "next";
import "@/app/Styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "Cinelista",
  description: "No Cinelista, você encontra os titulos mais populares, em alta e melhor avaliação em só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header/>
         {children}
        <Footer/>
      </body>
    </html>
  );
}
