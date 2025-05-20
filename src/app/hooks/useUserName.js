import { useState, useEffect } from "react";

export default function useUsername(uid) {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (!uid) return;

    fetch(`/api/username?uid=${uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.username) setUsername(data.username);
      });
  }, [uid]);

  return username;
}
