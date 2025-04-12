'use client'
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

const USER_DATA = {
    collections: [
        {
            title: "Tatuajes Geométricos",
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

export default function Fotos({ userData = USER_DATA }) {
    const [lightboxImage, setLightboxImage] = useState(null);

    const shareLinks = (imageUrl) => {
        const url = encodeURIComponent(imageUrl);
        return {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}`,
            instagram: `https://www.instagram.com/alejomayuri/`,
            whatsapp: `https://wa.me/?text=${url}`
        };
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="space-y-8">
                {userData.collections.map((collection, index) => (
                    <div key={index}>
                        <h2 className="text-xl font-semibold mb-3">{collection.title}</h2>
                        <div className="columns-2 gap-4 space-y-4">
                            {collection.photos.map((photo, photoIndex) => (
                                <div 
                                    key={photoIndex}
                                    className="break-inside-avoid overflow-hidden rounded relative"
                                >
                                    <img 
                                        src={photo.src} 
                                        alt={photo.alt} 
                                        className="w-full h-auto cursor-pointer rounded"
                                        loading="lazy"
                                        onClick={() => {
                                            setLightboxImage(photo.src);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {lightboxImage && (
                <div 
                    className="fixed flex-col p-2 inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => {
                        setLightboxImage(null);
                    }}
                >
                    <div className={`relative rounded duration-300`}>
                        <img 
                            src={lightboxImage} 
                            alt="Ampliada"
                            onClick={(e) => e.stopPropagation()}
                            loading="lazy"
                            className="max-w-full max-h-[90vh] rounded"
                        />
                        <button 
                            className="absolute top-2 right-2 text-sm bg-black text-white px-3 py-2 rounded-full opacity-70 transition duration-300"
                            onClick={() => {
                                setLightboxImage(null);
                            }}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 mb-2">
                        <a 
                            href={shareLinks(lightboxImage).facebook} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-800 transition"
                        >
                            <FaFacebook />
                        </a>
                        <a 
                            href={shareLinks(lightboxImage).twitter} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-600 transition"
                        >
                            <FaTwitter />
                        </a>
                        <a 
                            href={shareLinks(lightboxImage).instagram} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-700 transition"
                        >
                            <FaInstagram />
                        </a>
                        <a 
                            href={shareLinks(lightboxImage).whatsapp} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
