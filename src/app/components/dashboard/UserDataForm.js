// src/components/dashboard/UserDataForm.jsx
"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useUser } from "@/context/UserContext";

export default function UserDataForm() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setSuccess(false);

    try {
      const userRef = doc(db, "usuarios", user.uid);
      await updateDoc(userRef, {
        "portfolio.title": title,
        "portfolio.profileImage": profileImage,
      });
      setSuccess(true);
    } catch (err) {
      console.error("Error al guardar los datos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pataki_portfolio_upload");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dz3p460iu/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Cloudinary response:", data);
      if (data.secure_url) {
        setProfileImage(data.secure_url);
      } else {
        console.error("Error al subir la imagen a Cloudinary:", data);
      }
    } catch (err) {
      console.error("Error al subir la imagen:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl p-6 rounded-xl w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Personaliza tu portafolio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título o nombre para mostrar</label>
          <input
            type="text"
            placeholder="Diseñador freelance, Ilustrador, etc."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sube tu foto de perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded-xl p-3"
          />
          {uploading && <p className="text-sm text-gray-500">Subiendo imagen...</p>}
          {profileImage && (
            <img
              src={profileImage}
              alt="Preview"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>

        {success && <p className="text-green-600 mt-2">¡Datos guardados con éxito!</p>}
      </form>
      {(title || profileImage) && (
        <div className="mt-8 p-4 bg-gray-50 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Vista previa de tu perfil</h3>
          <div className="flex items-center space-x-4">
            {profileImage && (
              <img
                src={profileImage}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border"
              />
            )}
            <div className="text-gray-800 text-base font-medium">{title || "Tu título aparecerá aquí"}</div>
          </div>
        </div>
      )}
    </div>
  );
}
