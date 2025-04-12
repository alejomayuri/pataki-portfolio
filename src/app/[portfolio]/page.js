'use client';

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaDownload,
  FaCamera,
  FaPaintBrush,
  FaPencilRuler,
  FaFilm
} from "react-icons/fa";

export default function AboutMe() {
  const userData = {
    image: "/demo/persona1.jpg",
    title: "Alejo Mayurí",
    textBlocks: [
      {
        title: "Si, ese soy yo y ésta es mi historia",
        text: "Soy fotógrafa profesional y también artista visual. Me dedico a hacer muchas cosas pero también unas de las cosas que más me gusta es tomar fotografías desde mi celular. Puedo capturar los momentos que he vivido día a día. Las llamo fotografías efímeras, están y de ahí, desaparece tanto el recuerdo como el momento.",
      },
      {
        title: "Mis habilidades",
        text: "Fotografía de retrato, fotografía de paisajes, edición de fotografías, dirección de arte y composición visual.",
      },
      {
        title: "😋 Creamos una comunidad",
        text: "Me apasiona compartir mis conocimientos y experiencias con otros fotógrafos...",
      }
    ],
    cifras: [
      {
        title: "Proyectos Completados",
        value: "150",
      },
      {
        title: "Instagram",
        value: "10k+",
      },
      {
        title: "Dinero recaudado",
        value: "$50k+",
      }
    ],
    callAction: {
        title: "Descargar CV",
        link: "/cv.pdf",
    },
    socialTitle: "Sígueme en redes",
    skillsTitle: "Habilidades",
    // skills: [
    //   { name: "Fotografía de Retrato", icon: <FaCamera /> },
    //   { name: "Fotografía de Paisajes", icon: <FaCamera /> },
    //   { name: "Edición de Fotografías", icon: <FaPaintBrush /> },
    //   { name: "Dirección de Arte", icon: <FaPencilRuler /> },
    //   { name: "Composición Visual", icon: <FaFilm /> }
    // ],
    socialLinks: {
      facebook: "https://www.facebook.com/juanperezfotografia",
      twitter: "https://twitter.com/juanperez_foto",
      instagram: "https://www.instagram.com/juanperezfotografia",
      linkedin: "https://www.linkedin.com/in/juanperezfotografia"
    }
  };

  return (
    <div className="max-w-sm mx-auto text-center">
      {/* Imagen */}
      {userData.image && (
        <>
            <div className="mt-8 mb-6">
                <img
                    src={userData.image}
                    alt="Foto de perfil"
                    className="w-full h-auto rounded-xl shadow-md"
                />
            </div>
            <h1 className="text-lg font-bold mb-4">{userData.title}</h1>
        </>
      )}

      {/* Redes sociales */}
      <section className="mt-10">
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
        
      {/* Texto */}
      {userData.textBlocks && userData.textBlocks.length > 0 && (
        <section className="mt-10">
            {userData.textBlocks.map((block, index) => (
            <div key={index} className="mb-8">
                {block?.title && <h2 className="text-lg font-bold mb-4">{block?.title}</h2>}
                <p className="text-gray-700">{block?.text}</p>
            </div>
            ))}
        </section>
      )}

      {/* Cifras destacadas */}
      {userData.cifras && userData.cifras.length > 0 && (
        <section className="mt-10">
            <div className="grid grid-cols-2 gap-6">
            {userData.cifras.map((item, index) => (
                <div
                key={index}
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 border border-gray-100"
                >
                <span className="text-2xl font-extrabold text-gray-900">{item.value}</span>
                <span className="text-sm text-gray-500 mt-1 text-center">{item.title}</span>
                </div>
            ))}
            </div>
      </section>
      )}

      {/* Call action */}
      {userData.callAction && (
        <section className="mt-10">
            <a
                href={userData.callAction.link}
                download
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-md hover:bg-gray-700 transition"
            >
                {userData.callAction.title}
            </a>
        </section>
        )}

      {/* Habilidades */}
      {/* {userData.skills.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">{userData.skillsTitle}</h2>
          <ul className="grid grid-cols-2 gap-4 text-gray-600">
            {userData.skills.map((skill, index) => (
              <li
                key={index}
                className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg px-4 py-2 text-sm"
              >
                {skill.icon} {skill.name}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}
