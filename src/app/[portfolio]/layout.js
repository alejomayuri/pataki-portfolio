
import Header from "../components/portfolio/Header";

export default function Layout({ children }) {

  return (
    <div className="flex flex-col w-full bg-red-900">
      <Header />
      {/* Contenido */}
      <main className="min-h-screen pb-24 pt-4 px-2 mt-20">{children}</main>
    </div>
  );
}
