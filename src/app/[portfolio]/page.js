'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Slideshow from "@/app/components/portfolio/Photos/Slideshow";
import Skeleton from "../components/Skeleton";
import MainImage from "../components/portfolio/aboutPage/MainImage";
import NetworkButtons from "../components/portfolio/aboutPage/NetworkButtons";
import Description from "../components/portfolio/aboutPage/Description";
import { useUserSection } from "../hooks/useUserSection";

export default function AboutMe() {
  const { portfolio } = useParams();
  const { data: userData, loading, error } = useUserSection(portfolio, "about");

  if (loading) return <Skeleton type="about" />;
  if (error)   return <div className="text-center mt-10">Error: {error}</div>;
  console.log("userData", userData);

  return (
    <div className="max-w-sm mx-auto text-center">
      {/* Imagen */}
      {userData?.mainImage && (
        <MainImage image={userData?.mainImage} name={userData?.mainName} />
      )}

      {/* Redes sociales */}
      {userData?.social && <NetworkButtons data={userData?.social} />}
        
      {/* Texto */}
      {userData?.description && (
        <>
          <Description description={userData?.description} />
        </>
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

      {/* Preview Fotos */}
      {userData?.preview?.fotos && userData?.preview?.fotos?.length > 0 && (
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
