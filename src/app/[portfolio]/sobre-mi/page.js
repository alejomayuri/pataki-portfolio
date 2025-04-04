'use client';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaDownload, FaCamera, FaPaintBrush, FaPencilRuler, FaFilm, FaMusic } from "react-icons/fa";

export default function AboutMe() {
    const userData = {
        name: "Miquella",
        description: "Soy fotógrafo profesional con más de 10 años de experiencia capturando momentos únicos. Mi especialidad es la fotografía de retrato, pero también disfruto trabajando en paisajes y fotografía de eventos. Mi objetivo es capturar la esencia de cada persona y escena, creando imágenes que cuenten una historia y evoquen emociones.",
        image: "/demo/persona1.jpg",
        cv: "/cv.pdf",
        socialTitle: "Sígueme en redes",
        skillsTitle: "Habilidades",
        cvTitle: "Descargar CV",
        skills: [
            { name: "Fotografía de Retrato", icon: <FaCamera /> },
            { name: "Fotografía de Paisajes", icon: <FaCamera /> },
            { name: "Edición de Fotografías", icon: <FaPaintBrush /> },
            { name: "Dirección de Arte", icon: <FaPencilRuler /> },
            { name: "Composición Visual", icon: <FaFilm /> }
        ],
        socialLinks: {
            facebook: "https://www.facebook.com/juanperezfotografia",
            twitter: "https://twitter.com/juanperez_foto",
            instagram: "https://www.instagram.com/juanperezfotografia",
            linkedin: "https://www.linkedin.com/in/juanperezfotografia"
        }
    };

    return (
        <div className="max-w-sm mx-auto px-4 py-8 text-center">
            {/* Imagen de perfil */}
            <div className="flex flex-col aligne-center justify-center mb-6">
                <img 
                    src={userData.image} 
                    alt="Imagen de perfil" 
                    className="rounded-full w-36 h-36 object-cover border-4 border-gray-200 shadow-lg m-auto"
                />
                <h1 className="text-lg font-bold mb-3 mt-2 m-auto">@alejomayuri</h1>
            </div>

            {/* Introducción */}
            <section>
                <h2 className="text-4xl font-bold mb-3">Hola, soy {userData.name}</h2>
                <p className="text-lg text-gray-700 mb-4">{userData.description}</p>
                <a 
                    href={userData.cv} 
                    download 
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-md hover:bg-gray-700 transition"
                >
                    <FaDownload className="text-lg" /> {userData.cvTitle}
                </a>
            </section>

            {/* Habilidades */}
            {userData.skills.length > 0 && 
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">{userData.skillsTitle}</h2>
                    <ul className="grid grid-cols-2 gap-4 text-gray-600">
                        {userData.skills.map((skill, index) => (
                            <li key={index} className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg px-4 py-2 text-sm">
                                {skill.icon} {skill.name}
                            </li>
                        ))}
                    </ul>
                </div>
            }

            {/* Redes sociales */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">{userData.socialTitle}</h2>
                <div className="flex justify-center gap-6">
                    <a href={userData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300">
                        <FaFacebook size={28} />
                    </a>
                    <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition duration-300">
                        <FaTwitter size={28} />
                    </a>
                    <a href={userData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition duration-300">
                        <FaInstagram size={28} />
                    </a>
                    <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition duration-300">
                        <FaLinkedin size={28} />
                    </a>
                </div>
            </section>
        </div>
    );
}
