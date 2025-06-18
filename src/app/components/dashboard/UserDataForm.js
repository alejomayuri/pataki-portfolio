"use client";

import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { doc, updateDoc } from "firebase/firestore";
import LateralMenu from "./LateralMenu";
import HeaderForm from "./HeaderForm";
import AboutForm from "./AboutForm";
import useUsername from "@/app/hooks/useUserName";
import { useUserSection } from "@/app/hooks/useUserSection";
import useUserMenu from "@/app/hooks/useUserMenu";
import Preview from "./Preview";

const MENU_ITEMS = ["inicio", "sobre_mi", "paginas", "linktree", "diseño", "ajustes"];

// Datos iniciales para el formulario
const USER_ABOUT_DATA = {
  title: "",
  profileImage: "",
  about: {
    mainImage: "",
    mainName: "",
    social: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    description: "",
    amount: [],
    callAction: []
  }
};

export default function UserDataForm({ user }) {
  const [activeSection, setActiveSection] = useState("sobre_mi");
  const [userDataForm, setUserDataForm] = useState(USER_ABOUT_DATA);
  const [uploading, setUploading] = useState(false);
  
  const username = useUsername(user.uid);
  const {data: aboutData} = useUserSection(username, "about");
  const actualMenu = useUserMenu(username);

  // Hidratación inicial con datos del menú
  useEffect(() => {
    if (actualMenu) {
      setUserDataForm(prev => ({
        ...prev,
        title: actualMenu.title || prev.title,
        profileImage: actualMenu.profileImage || prev.profileImage,
      }));
    }

    if (aboutData) {
      setUserDataForm(prev => ({
        ...prev,
        about: aboutData
      }));
    }
  }, [actualMenu, aboutData]);

  // Derivar datos para la vista previa
  const menu = {
    title: userDataForm.title,
    profileImage: userDataForm.profileImage,
  };

  // Subida de imagen reutilizable
  const handleImageUpload = async (e, setImageCallback) => {
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
        setImageCallback(data.secure_url);
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
      <LateralMenu
        menuItems={MENU_ITEMS}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex flex-1">
        <Preview menu={menu} aboutData={userDataForm?.about} />

        <section className="w-[480px] p-6 overflow-auto bg-white">
          {activeSection === "sobre_mi" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Personaliza tu portafolio</h2>
              <HeaderForm
                user={user}
                userDataForm={userDataForm}
                uploading={uploading}
                setUserDataForm={setUserDataForm}
                imageUploader={handleImageUpload}
              />
              <AboutForm
                user={user}
                userDataForm={userDataForm}
                uploading={uploading}
                setUserDataForm={setUserDataForm}
                imageUploader={handleImageUpload}
              />
            </>
          )}
          {activeSection === "paginas" && (
            <div className="text-gray-500">
              <p>
                Sección <strong>{activeSection}</strong> en construcción xdddd.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
