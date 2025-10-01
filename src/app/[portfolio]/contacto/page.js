'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
  } from "react-icons/fa";
import Skeleton from "@/app/components/Skeleton";

export default function LinkTree() {
    const { portfolio } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch(`/api/user?username=${portfolio}&section=contacto`)
        .then(res => res.json())
        .then(data => setUserData(data));
    }, [portfolio]);

    if (!userData) return <Skeleton type="contacto" />;

    return (
        <div className="max-w-sm mx-auto">
            {/* Imagen */}
            {userData?.image && (
                <>
                    <div className="mt-8 mb-6 flex justify-center">
                        <img
                            src={userData.image}
                            alt="Foto de perfil"
                            className="w-32 h-32 rounded-full shadow-md object-cover"
                        />
                    </div>
                    <h1 className="text-lg font-bold mb-2 text-center">
                        {userData.title}
                    </h1>

                    {/* Íconos de redes sociales debajo de la imagen */}
                    <div className="flex justify-center gap-4 mb-6">
                        {userData?.social && (
                                <section className="mt-10">
                                    <div className="flex justify-center gap-6">
                                        <a href={userData?.social?.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition">
                                            <FaFacebook size={28} />
                                        </a>
                                        <a href={userData?.social?.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition">
                                            <FaTwitter size={28} />
                                        </a>
                                        <a href={userData?.social?.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition">
                                            <FaInstagram size={28} />
                                        </a>
                                        <a href={userData?.social?.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition">
                                            <FaLinkedin size={28} />
                                        </a>
                                    </div>
                                </section>
                            )}
                    </div>
                </>
            )}

            {/* Enlaces */}
            {/* <div className="space-y-4">
                {userData.linkGroup.map((group, index) => (
                    <div key={index} className="mb-8">
                        <div className="text-center">
                            <h2 className="text-lg font-bold mb-4">{group?.title}</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            {group.links.map((link, index) => (
                                <div key={index}>
                                    <a
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-center py-5 px-12 relative bg-gray-100 text-gray-800 rounded shadow-md hover:bg-gray-200 transition duration-300"
                                    >
                                        {(link.icon || link.image) && (
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                <div className="w-11 h-11">
                                                    <img
                                                        src={link.image}
                                                        alt={`${link.title} icon`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {link.title}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}
