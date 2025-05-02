'use client';

import { useParams } from 'next/navigation';
import Header from "../components/portfolio/Header";
import useUserMenu from "../hooks/useUserMenu";

export default function Layout({ children }) {
  const { portfolio } = useParams();

  const menu = useUserMenu(portfolio);

  if (!menu) return null;

  // useEffect(() => {
  //   const fetchMenu = async () => {
  //     const res = await fetch(`/api/user?username=${portfolio}&section=main-menu`);
  //     const data = await res.json();
  //     setMenu(data);
  //   };

  //   if (portfolio) {
  //     fetchMenu();
  //   }
  // }, [portfolio]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-t from-white to-purple-300 text-gray-800 bg-fixed">
      <Header data={menu} />
      <main className="pb-24 pt-4 px-2">{children}</main>
      <footer className="text-center py-4 text-sm text-gray-500">
        Powered by <a href="https://pataki.com" className="underline hover:text-gray-700">Pataki</a>
      </footer>
    </div>
  );
}
