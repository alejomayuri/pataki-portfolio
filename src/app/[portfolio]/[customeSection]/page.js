'use client'

import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa"; // Iconos de redes
import Fotos from "../fotos/page";

const DATA = {
    image: "/demo/persona1.jpg",
    collections: [
        {
            title: "Colección 2025 en Praga",
            photos: [
                { 
                    src: "/demo/image1.jpg", 
                    alt: "Tatuaje Geométrico - Líneas y formas",
                    description: "Un diseño de líneas finas que crean una figura geométrica abstracta, con un toque minimalista. Perfecto para quienes buscan un tatuaje discreto pero sofisticado.",
                    style: "Geometría" 
                },
                { 
                    src: "/demo/image2.jpg", 
                    alt: "Tatuaje de Mandala",
                    description: "",
                    style: "Tradicional"
                },
                { 
                    src: "/demo/image3.jpg", 
                    alt: "Tatuaje Abstracto",
                    description: "Diseño abstracto en tonos oscuros, explorando la libertad del arte y la forma sin límites.",
                    style: "Abstracto" 
                },
                { 
                    src: "/demo/image1.jpg", 
                    alt: "Tatuaje Geométrico - Líneas y formas",
                    description: "Un diseño de líneas finas que crean una figura geométrica abstracta, con un toque minimalista. Perfecto para quienes buscan un tatuaje discreto pero sofisticado.",
                    style: "Geometría" 
                },
                { 
                    src: "/demo/image2.jpg", 
                    alt: "Tatuaje de Mandala",
                    description: "",
                    style: "Tradicional"
                },
                { 
                    src: "/demo/image3.jpg", 
                    alt: "Tatuaje Abstracto",
                    description: "Diseño abstracto en tonos oscuros, explorando la libertad del arte y la forma sin límites.",
                    style: "Abstracto" 
                },
                { 
                    src: "/demo/image1.jpg", 
                    alt: "Tatuaje Geométrico - Líneas y formas",
                    description: "Un diseño de líneas finas que crean una figura geométrica abstracta, con un toque minimalista. Perfecto para quienes buscan un tatuaje discreto pero sofisticado.",
                    style: "Geometría" 
                },
                { 
                    src: "/demo/image2.jpg", 
                    alt: "Tatuaje de Mandala",
                    description: "",
                    style: "Tradicional"
                },
                { 
                    src: "/demo/image3.jpg", 
                    alt: "Tatuaje Abstracto",
                    description: "Diseño abstracto en tonos oscuros, explorando la libertad del arte y la forma sin límites.",
                    style: "Abstracto" 
                }
            ]
        }
    ]
}

export default function CustomSection({ pageType = "fotos", data = DATA }) {
    if (pageType === "fotos") {
        return <Fotos userData={data} />; // Renderiza la sección de fotos
    }
}
