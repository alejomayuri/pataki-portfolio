"use client";

import { useUser } from "@/context/UserContext";
import FormularioUsername from "../components/dashboard/UsernameForm";
import UserDataForm from "../components/dashboard/UserDataForm";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardPage() {
  const { user, loading } = useUser();
  const [hasUsername, setHasUsername] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      if (!user) return;

      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().username) {
        setHasUsername(true);
      }

      setCheckingUsername(false);
    };

    fetchUsername();
  }, [user]);
  console.log("user", user);
  if (loading || checkingUsername) return <p>Cargando...</p>;

  if (!user) {
    return <p>Acceso no autorizado. Por favor inicia sesión.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.email}</h1>
      <p className="mb-2">Tu ID de usuario es: {user.uid}</p>
      <p className="mb-6">Tu email es: {user.email}</p>

      {!hasUsername ? (
        <FormularioUsername onUsernameCreated={() => setHasUsername(true)} />
      ) : (
        <UserDataForm />
      )}
    </div>
  );
}
