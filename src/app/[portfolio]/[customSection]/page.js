'use client'

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Fotos from "@/app/components/portfolio/Photos";

export default function CustomSection() {
    const { portfolio, customSection } = useParams();
    const [sectionData, setSectionData] = useState(null);

    useEffect(() => {
        fetch(`/api/user?username=${portfolio}&section=${customSection}`)
            .then(res => res.json())
            .then(setSectionData);
    }, [portfolio, customSection]);

    if (!sectionData) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (sectionData && sectionData?.type === "fotos") {
        return <Fotos data={sectionData?.data} />; // Renderiza la sección de fotos
    }
}
