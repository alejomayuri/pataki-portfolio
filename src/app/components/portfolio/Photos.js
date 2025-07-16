'use client'

import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Fotos({ data }) {
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
        console.log("data", data);
    return (
        <div className="max-w-md mx-auto">
            {/* {data?.text && ( */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">{data?.name}</h2>
                    {/* <p className="text-gray-700">{data?.text?.text}</p> */}
                </div>
            {/* )} */}
            <div className="space-y-8">
                {data?.colections?.map((colection, index) => (
                    <div key={index}>
                        <h2 className="text-xl font-semibold mb-3">{colection?.name}</h2>
                        <div className="columns-2 gap-4 space-y-4">
                            {colection?.images?.map((image, photoIndex) => (
                                <div 
                                    key={photoIndex}
                                    className="break-inside-avoid overflow-hidden rounded relative"
                                >
                                    <img 
                                        src={image} 
                                        // alt={photo?.alt} 
                                        className="w-full h-auto cursor-pointer rounded"
                                        loading="lazy"
                                        onClick={() => {
                                            setLightboxImage(image);
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
