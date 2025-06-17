"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import LateralMenu from "./LateralMenu";
import HeaderForm from "./HeaderForm";
import AboutForm from "./AboutForm";
import useUsername from "@/app/hooks/useUserName";
import { useUserSection } from "@/app/hooks/useUserSection";
import useUserMenu from "@/app/hooks/useUserMenu";
import Preview from "./Preview";

const MENU_ITEMS = ["Inicio", "Sobre mí", "Páginas", "Linktree", "Diseño", "Ajustes"];

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
  const [activeSection, setActiveSection] = useState("Sobre mí");
  const [userDataForm, setUserDataForm] = useState(USER_ABOUT_DATA);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setSuccess(false);

    try {
      const userRef = doc(db, "usuarios", user.uid);
      await updateDoc(userRef, {
        "portfolio.title": userDataForm.title,
        "portfolio.profileImage": userDataForm.profileImage,
      });
      setSuccess(true);
    } catch (err) {
      console.error("Error al guardar los datos:", err);
    } finally {
      setLoading(false);
    }
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
          {activeSection === "Sobre mí" ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Personaliza tu portafolio</h2>
              <HeaderForm
                handleSubmit={handleSubmit}
                handleImageUpload={(e) =>
                  handleImageUpload(e, (url) =>
                    setUserDataForm((prev) => ({ ...prev, profileImage: url }))
                  )
                }
                loading={loading}
                success={success}
                uploading={uploading}
                profileImage={userDataForm.profileImage}
                title={userDataForm.title}
                setTitle={(value) =>
                  setUserDataForm((prev) => ({ ...prev, title: value }))
                }
              />
              <AboutForm
                user={user}
                currentImage={userDataForm.about.mainImage}
                currentName={userDataForm.about.mainName}
                currentSocial={userDataForm.about.social}
                currentDescription={userDataForm.about.description}
                currentAmount={userDataForm.about.amount}
                currentCallAction={userDataForm.about.callAction}
                handleImageUpload={(e) =>
                  handleImageUpload(e, (url) => 
                    setUserDataForm((prev) => ({...prev, about: { ...prev.about, mainImage: url }}))
                  )
                }
                setName={(value) =>
                  setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, mainName: value }}))
                }
                setSocial={(social) =>
                  setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, social }}))
                }
                setDescription={(value) =>
                  setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, description: value }}))
                }
                setAmount={(amount) =>
                  setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, amount }}))
                }
                setCallAction={(callAction) =>
                  setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, callAction }}))
                }
              />
            </>
          ) : (
            <div className="text-gray-500">
              <p>
                Sección <strong>{activeSection}</strong> en construcción.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
