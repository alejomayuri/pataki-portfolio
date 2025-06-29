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
import Amounts from "../components/portfolio/aboutPage/Amounts";
import CallAction from "../components/portfolio/aboutPage/CallAction";
import { useUserSection } from "../hooks/useUserSection";

export default function AboutMe() {
  const { portfolio } = useParams();
  const { data: userData, loading, error } = useUserSection(portfolio, "about");

  if (loading) return <Skeleton type="about" />;
  if (error)   return <div className="text-center mt-10">Error: {error}</div>;

  return (
    <div className="max-w-sm mx-auto text-center">
      {/* Imagen */}
      {userData?.mainImage && <MainImage image={userData?.mainImage} name={userData?.mainName} />}

      {/* Redes sociales */}
      {userData?.social && <NetworkButtons data={userData?.social} />}
        
      {/* Texto */}
      {userData?.description && <Description description={userData?.description} />}

      {/* Cifras destacadas */}
      {userData?.amount && userData?.amount?.length > 0 && <Amounts amounts={userData?.amount} />}

      {/* Call action */}
      {userData?.callAction && <CallAction callActions={userData?.callAction} />}

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
