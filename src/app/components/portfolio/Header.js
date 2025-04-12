'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaTelegram,
  FaEnvelope
} from "react-icons/fa";

const USER_DATA = {
  image: "/demo/persona1.jpg",
  title: "How it works Alejo Mayurí",
  menuLinks: [
    { title: "Sobre mí", link: "/xd" },
    { title: "Fotos", link: "/xd/fotos" },
    { title: "Colección 2025 en Praga", link: "/xd/coleccion-2025-en-praga" },
    { title: "Serendipity x Alejo Mayuri", link: "/xd/serendipity-x-alejo-mayuri" },
    { title: "Contacto", link: "/xd/contacto" },
  ],
  shareButtons: [
    {
      name: "Facebook",
      icon: <FaFacebook size={36} />,
      baseUrl: "https://www.facebook.com/sharer/sharer.php?u="
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={36} />,
      baseUrl: "https://twitter.com/intent/tweet?url="
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={36} />,
      baseUrl: "https://wa.me/?text="
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={36} />,
      baseUrl: "https://www.linkedin.com/sharing/share-offsite/?url="
    },
    {
      name: "Telegram",
      icon: <FaTelegram size={36} />,
      baseUrl: "https://t.me/share/url?url="
    },
    {
      name: "Email",
      icon: <FaEnvelope size={36} />,
      baseUrl: "mailto:?body="
    }
  ]
};

export default function Header({ userData = USER_DATA }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <header className="mt-4 fixed top-0 left-0 right-0 z-50 flex items-center justify-between max-w-md px-2 mx-auto">
        <div className={`flex relative mx-auto max-w-md rounded-full py-4 w-full items-center ${userData?.image ? 'justify-between' : 'justify-end'} bg-white shadow-sm px-4 bg-white/80 backdrop-blur-sm`}>
          {/* Logo o imagen */}
          {userData?.image && (
            <div>
              <Link href="/xd" className="flex items-center gap-2 z-99">
                <img
                  src={userData?.image}
                  alt="Logo"
                  className="w-10 h-10 object-cover rounded-full border-2 border-gray-200 shadow-md"
                />
              </Link>
            </div>
          )}

          {/* Título o nombre */}
          {userData?.title && (
            <div className="w-full absolute left-1/2 transform -translate-x-1/2">
              <Link href="/xd" className="block text-center mx-auto text-lg font-bold text-gray-800">
                {userData?.title}
              </Link>
            </div>
          )}

          {/* Botón hamburguesa */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-800 z-99"
            aria-label="Abrir menú"
          >
            <Menu size={28} />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Fondo oscuro semitransparente */}
              <motion.div
                className="fixed inset-0 bg-black z-40"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
              />

              {/* Contenedor del menú */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 max-w mx-auto max-w-md px-2 mx-auto"
                initial={{ y: "100%" }}
                animate={{ y: "2%" }} // opcionalmente puedes ajustar esto también
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ maxHeight: "80vh", overflowY: "scroll", transform: "translateY(0%)" }} 
              >
                <div className="overflow-scroll" >
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-600"
                      aria-label="Cerrar menú"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <nav className="flex flex-col gap-1 text-gray-900 font-semibold text-lg">
                    {userData?.menuLinks?.map((link, index) => (
                      <Link
                        key={index}
                        href={link.link}
                        className="block py-2 px-4 rounded hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </nav>

                  {/* Botones para compartir */}
                  {userData?.shareButtons?.length > 0 && (
                    <div className="mt-8 border-t pt-6">
                      <div className="flex flex-wrap justify-center gap-6">
                        {userData.shareButtons.map((button, index) => (
                          <a
                            key={index}
                            href={`${button.baseUrl}${encodeURIComponent(currentUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-1 text-sm text-gray-600 hover:text-black transition-transform hover:scale-110"
                            aria-label={`Compartir en ${button.name}`}
                            title={`Compartir en ${button.name}`}
                          >
                            {button.icon}
                            <span className="text-xs">{button.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Invitación a crear portafolio */}
                  <div className="mt-10 text-left px-4">
                    <h3 className="text-base font-bold text-gray-800 mb-2">
                      Únete a <span className="text-black">alejomayuri</span> en <span className="text-black">Pataki Portfolio</span>
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      ¿Te gustaría tener tu propio portafolio como este?
                    </p>
                    <div className="flex justify-between gap-5 mt-8">
                      <Link
                        href="/crear"
                        className="bg-black text-center text-white text-base font-semibold px-2 py-3 rounded-full shadow hover:bg-gray-800 transition-colors flex-1"
                      >
                        Regístrate gratis
                      </Link>
                      <Link
                        href="/"
                        className="text-center bg-gray-200 text-base font-semibold px-2 py-3 rounded-full hover:bg-gray-300 transition-colors flex-1"
                      >
                        Ver más
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
