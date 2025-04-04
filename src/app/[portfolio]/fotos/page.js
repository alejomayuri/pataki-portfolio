'use client'
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa"; // Iconos de redes

export default function Portfolio() {
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxStyle, setLightboxStyle] = useState(null); // Estado para la etiqueta en el Lightbox

    const collections = [
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
                    src: "/demo/image3.jpg", 
                    alt: "Tatuaje Realista - Paisaje Natural",
                    description: "Tatuaje de un paisaje montañoso con nubes densas y árboles detallados, creando una escena tan vívida que casi se puede oler la brisa fresca.",
                    style: "Realismo"
                }
            ]
        }
    ];

    // Función para generar enlaces de compartir
    const shareLinks = (imageUrl) => {
        const url = encodeURIComponent(imageUrl);
        return {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}`,
            instagram: `https://www.instagram.com/alejomayuri/`,  // Instagram no permite compartir vía URL
            whatsapp: `https://wa.me/?text=${url}`
        };
    };

    // Función para asignar colores a las etiquetas
    const getTagColor = (style) => {
        switch(style) {
            case 'Realismo':
                return 'bg-green-500';
            case 'Minimalista':
                return 'bg-gray-500';
            case 'Old School':
                return 'bg-red-500';
            case 'Tradicional':
                return 'bg-blue-500';
            case 'Geometría':
                return 'bg-purple-500';
            case 'Abstracto':
                return 'bg-yellow-500'; // Color amarillo para estilo Abstracto
            default:
                return 'bg-transparent'; // Si no hay estilo, no mostrar la etiqueta
        }
    };

    return (
        <div className="max-w-sm mx-auto px-2 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Fotos</h1>

            <div className="space-y-8">
                {collections.map((collection, index) => (
                    <div key={index}>
                        <h2 className="text-xl font-semibold mb-3">{collection.title}</h2>
                        <div className="flex flex-col gap-4">
                            {collection.photos.map((photo, photoIndex) => (
                                <div 
                                    key={photoIndex} 
                                    className="overflow-hidden rounded shadow-md bg-white relative"
                                >
                                    {/* Mostrar etiqueta si existe */}
                                    {photo.style && photo.style !== '' && (
                                        <div className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-full ${getTagColor(photo.style)}`}>
                                            {photo.style}
                                        </div>
                                    )}
                                    <img 
                                        src={photo.src} 
                                        alt={photo.alt} 
                                        className="w-full h-auto cursor-pointer"
                                        lazyload="true"
                                        loading="lazy"
                                        onClick={() => {
                                            setLightboxImage(photo.src);
                                            setLightboxStyle(photo.style); // Guardamos la etiqueta para el Lightbox
                                        }}
                                    />
                                    {photo.description && (
                                        <div className="p-3">
                                            <p className="text-gray-600 text-sm">{photo.description}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div 
                    className="fixed flex-col p-2 inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => {
                        setLightboxImage(null);
                        setLightboxStyle(null); // Limpiamos la etiqueta cuando cerramos el Lightbox
                    }}
                >
                    <div className={`relative bg-white rounded duration-300 `}>
                        <img 
                            src={lightboxImage} 
                            alt="Ampliada"
                            onClick={(e) => e.stopPropagation()} // Evitar que el click cierre el Lightbox
                            lazyload="true"
                            loading="lazy"
                            className="max-w-full max-h-[90vh] rounded"
                        />
                        {/* Mostrar etiqueta si existe en el Lightbox */}
                        {lightboxStyle && lightboxStyle !== '' && (
                            <div className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-full ${getTagColor(lightboxStyle)}`}>
                                {lightboxStyle}
                            </div>
                        )}
                        <button 
                            className="absolute top-2 right-2 text-sm bg-black text-white px-3 py-2 rounded-full opacity-70 transition duration-300"
                            onClick={() => {
                                setLightboxImage(null);
                                setLightboxStyle(null); // Limpiamos también la etiqueta al cerrar el Lightbox
                            }}
                        >
                            ✕
                        </button>
                    </div>
                    {/* Botones de compartir debajo de la imagen */}
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
