import { useState, useEffect } from "react";

export default function useUserMenu(username) {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    if (!username) return;

    fetch(`/api/menu?username=${username}`)
      .then((res) => res.json())
      .then((data) => setMenuData(data));
  }, [username]);

  return menuData;
}
