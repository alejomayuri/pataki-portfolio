'use client';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function LinkTree() {
    const userData = {
        image: "/demo/persona1.jpg",
        socialLinks: [
            {
                title: "Facebook",
                link: "https://www.facebook.com/juanperezfotografia",
                icon: <FaFacebook size={20} className="w-7 h-7" />,
            },
            {
                title: "Twitter",
                link: "https://twitter.com/juanperez_foto",
                image: "/demo/image2.jpg", // Ejemplo usando imagen en vez de icono
            },
            {
                title: "Instagram",
                link: "https://www.instagram.com/juanperezfotografia",
                icon: <FaInstagram size={20} className="w-7 h-7" />,
            },
            {
                title: "Linkedin",
                link: "https://www.linkedin.com/in/juanperezfotografia",
                image: "/demo/image3.jpg",
            },
        ]
    };

    return (
        <div className="max-w-sm mx-auto px-2 py-8">
            <div className="flex flex-col aligne-center justify-center mb-6">
                <img 
                    src={userData.image} 
                    alt="Imagen de perfil" 
                    className="rounded-full w-36 h-36 object-cover border-4 border-gray-200 shadow-lg m-auto"
                />
                <h1 className="text-lg font-bold mb-3 mt-2 m-auto">@alejomayuri</h1>
            </div>
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">¡Conéctate conmigo!</h2>
            </div>

            {/* Enlaces */}
            <div className="space-y-4">
                {userData.socialLinks.map((link, index) => (
                    <a 
                        key={index} 
                        href={link.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block text-center py-5 px-4 relative bg-gray-900 text-white rounded shadow-md hover:bg-gray-700 transition duration-300"
                    >
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            {link.icon ? (
                                link.icon
                            ) : (
                                <div className="w-11 h-11" >
                                    <img 
                                        src={link.image} 
                                        alt={`${link.title} icon`} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            )}
                        </div>
                        {link.title}
                    </a>
                ))}
            </div>
        </div>
    );
}
