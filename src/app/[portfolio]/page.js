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
  const { data: userData, loading, error } = useUserSection(portfolio);
  const { about, pages } = userData || {};

  if (loading) return <Skeleton type="about" />;
  if (error)   return <div className="text-center mt-10">Error: {error}</div>;

  return (
    <div className="max-w-sm mx-auto text-center">
      {/* Imagen */}
      {about?.mainImage && <MainImage image={about?.mainImage} name={about?.mainName} />}

      {/* Redes sociales */}
      {about?.social && <NetworkButtons data={about?.social} />}
        
      {/* Texto */}
      {about?.description && <Description description={about?.description} />}

      {/* Cifras destacadas */}
      {about?.amount && about?.amount?.length > 0 && <Amounts amounts={about?.amount} />}

      {/* Call action */}
      {about?.callAction && <CallAction callActions={about?.callAction} />}

      {/* Preview Fotos */}
      {pages && pages.length > 0 && (
        <section className="mt-12 space-y-12">
          {pages.map((section, i) => (
            section.colections && <Link
              key={section.id}
              href={`/${portfolio}/${section.slug}`}
              className="block"
            >
              <Slideshow title={section.name} album={section.colections} />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
