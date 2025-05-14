"use client";
import { useState } from "react";
import { registerUser, loginWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Registro() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-8 text-center">Crear cuenta</h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full mb-6 p-3 bg-black text-white rounded-xl text-base font-medium hover:bg-gray-800"
        >
          Entrar con Google
        </button>

        <div className="mb-6 text-center text-gray-400 text-sm">O usa tu correo</div>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-4 rounded-xl font-medium hover:bg-gray-800"
          >
            Crear cuenta
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
