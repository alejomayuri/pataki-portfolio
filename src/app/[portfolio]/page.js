'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Slideshow from "@/app/components/portfolio/Photos/Slideshow";

export default function AboutMe() {
  const { portfolio } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`/api/user?username=${portfolio}`)
    .then(res => res.json())
    .then(data => setUserData(data));
  }, [portfolio]);

  console.log(userData);

  if (!userData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto text-center">
      {/* Imagen */}
      {userData?.image && (
        <>
            <div className="mt-8 mb-6">
                <img
                    src={userData?.image}
                    alt="Foto de perfil"
                    className="w-full h-auto rounded-xl shadow-md"
                />
            </div>
            <h1 className="text-lg font-bold mb-4">{userData?.name}</h1>
        </>
      )}

      {/* Redes sociales */}
      {userData?.social && (
        <section className="mt-10">
          <div className="flex justify-center gap-6">
            <a href={userData?.social?.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300">
              <FaFacebook size={28} />
            </a>
            <a href={userData?.social?.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition duration-300">
              <FaTwitter size={28} />
            </a>
            <a href={userData?.social?.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition duration-300">
              <FaInstagram size={28} />
            </a>
            <a href={userData?.social?.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition duration-300">
              <FaLinkedin size={28} />
            </a>
          </div>
        </section>
      )}
        
      {/* Texto */}
      {userData?.text && userData?.text?.length > 0 && (
        <section className="mt-10">
            {userData?.text.map((block, index) => (
            <div key={index} className="mb-8">
                {block?.title && <h2 className="text-lg font-bold mb-4">{block?.title}</h2>}
                <p className="text-gray-700">{block?.text}</p>
            </div>
            ))}
        </section>
      )}

      {/* Cifras destacadas */}
      {userData?.amount && userData?.amount?.length > 0 && (
        <section className="mt-10">
            <div className="grid grid-cols-2 gap-6">
            {userData?.amount.map((item, index) => (
                <div
                key={index}
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 border border-gray-100"
                >
                <span className="text-2xl font-extrabold text-gray-900">{item?.value}</span>
                <span className="text-sm text-gray-500 mt-1 text-center">{item?.title}</span>
                </div>
            ))}
            </div>
      </section>
      )}

      {/* Call action */}
      {userData?.callAction && (
        <section className="mt-10">
            <a
                href={userData?.callAction?.link}
                download
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-md hover:bg-gray-700 transition"
            >
                {userData?.callAction?.title}
            </a>
        </section>
        )}

      {userData?.preview?.fotos && userData.preview.fotos.length > 0 && (
        <section className="mt-12 space-y-12">
          {userData.preview.fotos.map((section, i) => (
            <Link
              key={section.key}
              href={`/${portfolio}/${section.key}`}
              className="block"
            >
              <Slideshow title={section.name} albums={section.albums} />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
