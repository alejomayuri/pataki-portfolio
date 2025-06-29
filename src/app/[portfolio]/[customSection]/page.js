'use client'

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Fotos from "@/app/components/portfolio/Photos";
import Skeleton from "@/app/components/Skeleton";
import { useUserSection } from "@/app/hooks/useUserSection";

export default function CustomSection() {
    const { portfolio, customSection } = useParams();
    // const [sectionData, setSectionData] = useState(null);

    // const { portfolio } = useParams();
    const { data: sectionData, loading, error } = useUserSection(portfolio, customSection);

    // useEffect(() => {
    //     fetch(`/api/user?username=${portfolio}&section=${customSection}`)
    //         .then(res => res.json())
    //         .then(setSectionData);
    // }, [portfolio, customSection]);

    if (loading) return <Skeleton type="fotos" />;
    if (error)   return <div className="text-center mt-10">Error: {error}</div>;
    
    // if (!sectionData) return <Skeleton type="fotos" />;

    if (sectionData && sectionData?.type === "fotos") {
        return <Fotos data={sectionData?.data} />; // Renderiza la sección de fotos
    } else {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold mb-4">Sección no encontrada</h1>
                <p className="text-gray-600">No se pudo encontrar la sección solicitada.</p>
            </div>
        );
    }
}
