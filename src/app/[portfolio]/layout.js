import Header from "../components/portfolio/Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-t from-white to-purple-300 text-gray-800 bg-fixed">
      < Header />
      {/* Contenido */}
      <main className="pb-24 pt-4 px-2 mt-20">{children}</main>
    </div>
  );
}
