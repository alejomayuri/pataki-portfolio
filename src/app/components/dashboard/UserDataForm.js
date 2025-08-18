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
import PagesForm from "./PagesForm";
import CustomePageForm from "./CustomePageForm";

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
  },
  pages: [],
  menuLinks: [],
};

export default function UserDataForm({ user }) {
  const MENU_ITEMS = [
    {
      name: "Inicio",
      section: "inicio"
    },
    {
      name: "Sobre mí",
      section: "about"
    },
    {
      name: "Páginas",
      section: "pages",
      subitems: []
    },
    {
      name: "Linktree",
      section: "linktree"
    },
    {
      name: "Diseño",
      section: "design"
    },
    {
      name: "Ajustes",
      section: "settings"
    }
  ];

  const [activeSection, setActiveSection] = useState("about");
  const [userDataForm, setUserDataForm] = useState(USER_ABOUT_DATA);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [uploading, setUploading] = useState(false);
  
  const username = useUsername(user.uid);
  const {data: aboutData} = useUserSection(username, "about");
  const {data: pagesData} = useUserSection(username, "pages");
  const {data: menuLinksData} = useUserSection(username, "menuLinks");
  const actualMenu = useUserMenu(username);

  console.log("UserDataForm", userDataForm);

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

    if (pagesData) {
      setUserDataForm(prev => ({
        ...prev,
        pages: pagesData
      }));
      setMenuItems(prev => {
        const updatedItems = [...prev];
        const pagesItem = updatedItems.find(item => item.section === "pages");
        if (pagesItem) {
          pagesItem.subitems = pagesData.map(page => ({
            name: page.name,
            section: page.slug || page.name.toLowerCase().replace(/\s+/g, "-"),
            type: page.type || "default"
          }));
        }
        return updatedItems;
      });
    }

    if (menuLinksData) {
      setUserDataForm(prev => ({
        ...prev,
        menuLinks: menuLinksData
      }));
    }
  }, [actualMenu, aboutData, pagesData]);

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

  const subitemSelected = userDataForm.pages.find(
    page => page.slug === activeSection
  );
  // console.log("activeSection", activeSection);
  // console.log("userDataForm", userDataForm);
  // console.log("Subitem selected:", subitemSelected);

  return (
    <div className="flex h-screen">
      <LateralMenu
        menuItems={menuItems}
        pagesData={pagesData}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex flex-1">
        <Preview menu={menu} aboutData={userDataForm?.about} />

        <section className="w-[480px] p-6 overflow-auto bg-white">
          {activeSection === "about" && (
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

          {activeSection === "pages" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Personaliza las páginas de tu portafolio</h2>
              <PagesForm
                user={user}
                userDataForm={userDataForm}
                setUserDataForm={setUserDataForm}
                username={username}
              />
            </>
          )}

          {menuItems[2].subitems.some(item => item.section === activeSection) && (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Editar página: {subitemSelected.name}
              </h2>
              <CustomePageForm
                user={user}
                userDataForm={userDataForm}
                uploading={uploading}
                setUserDataForm={setUserDataForm}
                section={subitemSelected}
                imageUploader={handleImageUpload}
              />
            </>
          )}

          {activeSection === "linktree" && (
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
