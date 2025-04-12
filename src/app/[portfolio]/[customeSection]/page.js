'use client'

import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa"; // Iconos de redes
import Fotos from "../fotos/page";

const DATA = {
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
                    src: "/demo/image4.jpg", 
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
                    src: "/demo/image4.jpg", 
                    alt: "Tatuaje Abstracto",
                    description: "Diseño abstracto en tonos oscuros, explorando la libertad del arte y la forma sin límites.",
                    style: "Abstracto" 
                },
                { 
                    src: "/demo/image5.jpg", 
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
        },
        {
            title: "Tatuajes de Realismo",
            photos: [
                { 
                    src: "/demo/image1.jpg", 
                    alt: "Tatuaje Realista - Retrato de un León",
                    description: "Retrato realista de un león con detalles minuciosos, capturando la esencia de la majestuosidad de este animal. Un diseño que simboliza fuerza y valentía.",
                    style: "Realismo" 
                },
                { 
                    src: "/demo/image2.jpg", 
                    alt: "Tatuaje Realista - Retrato de una Mujer",
                    description: "Un retrato en blanco y negro de una mujer con un estilo delicado pero profundo, destacando emociones a través de sombras sutiles y líneas precisas.",
                    style: "" 
                },
                { 
                    src: "/demo/image1.jpg", 
                    alt: "Tatuaje Realista - Retrato de un León",
                    description: "Retrato realista de un león con detalles minuciosos, capturando la esencia de la majestuosidad de este animal. Un diseño que simboliza fuerza y valentía.",
                    style: "Realismo" 
                },
                { 
                    src: "/demo/image4.jpg", 
                    alt: "Tatuaje Realista - Retrato de un León",
                    description: "Retrato realista de un león con detalles minuciosos, capturando la esencia de la majestuosidad de este animal. Un diseño que simboliza fuerza y valentía.",
                    style: "Realismo" 
                },
                { 
                    src: "/demo/image5.jpg", 
                    alt: "Tatuaje Realista - Retrato de un León",
                    description: "Retrato realista de un león con detalles minuciosos, capturando la esencia de la majestuosidad de este animal. Un diseño que simboliza fuerza y valentía.",
                    style: "Realismo" 
                },
                { 
                    src: "/demo/image1.jpg", 
                    alt: "Tatuaje Realista - Retrato de un León",
                    description: "Retrato realista de un león con detalles minuciosos, capturando la esencia de la majestuosidad de este animal. Un diseño que simboliza fuerza y valentía.",
                    style: "Realismo" 
                },
            ]
        }
    ]
}

export default function CustomSection({ pageType = "fotos", data = DATA }) {
    if (pageType === "fotos") {
        return <Fotos userData={data} />; // Renderiza la sección de fotos
    }
}
