'use client'
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ userData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="mt-4 mx-auto fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-2">
        <div className="flex mx-auto max-w-md rounded-full py-4 w-full items-center justify-between bg-white shadow-sm px-4">
          <div>
            <img
              src="/demo/persona1.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shadow-md"
            />
          </div>

          {/* Botón hamburguesa */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-800"
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
                animate={{ opacity: .70 }}
                exit={{ opacity: 0 }}
              />

              {/* Contenedor del menú */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 max-w mx-auto"
                initial={{ y: "100%" }}
                animate={{ y: "30%" }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ height: "100vh" }}
              >
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600"
                    aria-label="Cerrar menú"
                  >
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex flex-col gap-4 text-gray-900 font-semibold text-lg">
                  <Link href="/xd/sobre-mi" onClick={() => setIsOpen(false)}>Sobre mí</Link>
                  <Link href="/xd/fotos" onClick={() => setIsOpen(false)}>Fotos</Link>
                  <Link href="/xd/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
      <div className="flex flex-col aligne-center mt-24 pt-8 justify-center ">
        <img 
          src="/demo/persona1.jpg" 
          alt="Imagen de perfil" 
          className="rounded-full w-36 h-36 object-cover border-4 border-gray-200 shadow-lg m-auto"
        />
        <h1 className="text-lg font-bold mb-3 mt-2 m-auto">@alejomayuri</h1>
      </div>
    </>
  )
}