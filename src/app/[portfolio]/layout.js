
import Header from "../components/portfolio/Header";

export default function Layout({ children }) {

  return (
    <>
      <Header />
      {/* Contenido */}
      <main className="min-h-screen pb-24 pt-4 px-2">{children}</main>
    </>
  );
}
