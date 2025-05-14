"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { isUsernameAvailable, saveUsernameForUser } from "@/lib/usuarios";
import { useRouter } from "next/navigation";

export default function UsernameStep({onUsernameCreated}) {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError("");

    if (!username.trim()) {
      setError("El nombre de usuario no puede estar vacío.");
      setChecking(false);
      return;
    }

    try {
      const available = await isUsernameAvailable(username);
      if (!available) {
        setError("Ese nombre de usuario ya está en uso.");
        setChecking(false);
        return;
      }

      await saveUsernameForUser(user.uid, username);
      router.push("/dashboard");
      onUsernameCreated();
    } catch (err) {
      setError("Error al guardar el nombre de usuario.");
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Elige tu nombre de usuario</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="pataki.io/tu-nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            disabled={checking}
            className="w-full bg-black text-white p-4 rounded-xl font-medium hover:bg-gray-800"
          >
            {checking ? "Guardando..." : "Continuar"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
