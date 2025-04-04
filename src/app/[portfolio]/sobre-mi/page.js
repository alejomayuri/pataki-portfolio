'use client';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Iconos de redes

export default function AboutMe() {
    const skills = [
        "Fotografía de Retrato", "Fotografía de Paisajes", "Edición de Fotografías", "Dirección de Arte", "Composición Visual"
    ];

    const socialLinks = {
        facebook: "https://www.facebook.com/juanperezfotografia",
        twitter: "https://twitter.com/juanperez_foto",
        instagram: "https://www.instagram.com/juanperezfotografia",
        linkedin: "https://www.linkedin.com/in/juanperezfotografia"
    };

    return (
        <div className="max-w-sm mx-auto px-2 py-8">
            {/* Imagen de perfil */}
            <div className="flex justify-center mb-8">
                <img 
                    src="/demo/persona1.jpg" 
                    alt="Imagen de perfil" 
                    className="rounded-full w-40 h-40 object-cover border-4 border-gray-200 shadow-lg"
                />
            </div>

            {/* Introducción */}
            <section>
                <h1 className="text-4xl font-bold text-center mb-4">Hola, soy Miquella</h1>
                <p className="text-lg text-gray-700 mb-6 text-center">
                    Soy fotógrafo profesional con más de 10 años de experiencia capturando momentos únicos. Mi especialidad es la fotografía de retrato, pero también disfruto trabajando en paisajes y fotografía de eventos. Mi objetivo es capturar la esencia de cada persona y escena, creando imágenes que cuenten una historia y evoquen emociones.
                </p>

                {/* Habilidades */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Habilidades</h2>
                    <ul className="grid grid-cols-2  gap-4 text-gray-600">
                        {skills.map((skill, index) => (
                            <li key={index} className="bg-gray-100 rounded-lg px-4 py-2 text-center text-sm">
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Enlaces a redes sociales */}
            <section className="flex justify-center gap-6 mt-8">
                <a 
                    href={socialLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                >
                    <FaFacebook size={28} />
                </a>
                <a 
                    href={socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:text-blue-600 transition duration-300"
                >
                    <FaTwitter size={28} />
                </a>
                <a 
                    href={socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-pink-500 hover:text-pink-700 transition duration-300"
                >
                    <FaInstagram size={28} />
                </a>
                <a 
                    href={socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-700 hover:text-blue-900 transition duration-300"
                >
                    <FaLinkedin size={28} />
                </a>
            </section>
        </div>
    );
}
