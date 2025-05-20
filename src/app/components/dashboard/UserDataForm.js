"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import LateralMenu from "./LateralMenu";
import HeaderForm from "./HeaderForm";
import useUsername from "@/app/hooks/useUserName";
import useUserMenu from "@/app/hooks/useUserMenu";
import Preview from "./Preview";

const MENU_ITEMS = ["Inicio", "Sobre mí", "Páginas", "Linktree", "Diseño", "Ajustes"];

export default function UserDataForm({ user }) {
  const [activeSection, setActiveSection] = useState("Sobre mí");
  const [title, setTitle] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const username  = useUsername(user.uid);
  const actualMenu = useUserMenu(username);
  const [menu, setMenu] = useState({
    title: "",
    profileImage: "",
  })

  useEffect(() => {
    if (actualMenu?.title && !title) {
      setTitle(actualMenu.title);
    }
    if (actualMenu?.profileImage && !profileImage) {
      setProfileImage(actualMenu.profileImage);
    }
    if (actualMenu?.title && actualMenu?.profileImage) {
      setMenu({
        title: title,
        profileImage: profileImage,
      });
    }
  }, [actualMenu, title, profileImage]);
    
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
    <div className="flex h-screen">
      {/* Menú lateral */}
      <LateralMenu menuItems={MENU_ITEMS} activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Contenido central (Preview + Formulario) */}
      <main className="flex flex-1">
        {/* Vista previa */}
        <Preview menu={menu} />

        {/* Formulario */}
        <section className="w-[480px] p-6 overflow-auto bg-white">
          {activeSection === "Sobre mí" ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Personaliza tu portafolio</h2>
              <HeaderForm
                handleSubmit={handleSubmit}
                handleImageUpload={handleImageUpload}
                loading={loading}
                success={success}
                uploading={uploading}
                profileImage={profileImage}
                title={title}
                setTitle={setTitle}
              />
            </>
          ) : (
            <div className="text-gray-500">
              <p>Sección <strong>{activeSection}</strong> en construcción.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
