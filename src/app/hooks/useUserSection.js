import { useState, useEffect } from "react";

export function useUserSection(username, section) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    setError(null);

    fetch(`/api/user?username=${encodeURIComponent(username)}&section=${section ? encodeURIComponent(section) : ''}`)
      .then(async (res) => {
        if (!res.ok) {
          // intentar leer mensaje de error JSON
          let errMsg = res.statusText;
          try {
            const errObj = await res.json();
            if (errObj.error) errMsg = errObj.error;
          } catch {}
          throw new Error(errMsg);
        }
        // parsear JSON
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [username, section]);

  return { data, loading, error };
}
