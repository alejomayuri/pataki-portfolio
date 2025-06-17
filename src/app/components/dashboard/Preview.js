"use client";

import Header from "../portfolio/Header";
import MainImage from "../portfolio/aboutPage/MainImage";
import NetworkButtons from "../portfolio/aboutPage/NetworkButtons";
import Description from "../portfolio/aboutPage/Description";
import Amounts from "../portfolio/aboutPage/Amounts";
import CallAction from "../portfolio/aboutPage/CallAction";

export default function Preview({ menu, aboutData }) {
    return (
        <section className="flex-1 p-6 overflow-auto border-r bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Vista previa</h3>
            <div className="flex flex-col w-sm mx-auto min-h-screen bg-gradient-to-t from-white to-purple-300 text-gray-800 bg-fixed">
                <Header data={menu} preview />
                <div className="pb-24 pt-4 px-2">
                    <div className="max-w-sm mx-auto text-center">
                        {aboutData?.mainImage && <MainImage image={aboutData.mainImage} name={aboutData.mainName} />}
                        {aboutData?.social && <NetworkButtons data={aboutData?.social} />}
                        {aboutData?.description && <Description description={aboutData.description} />}
                        {aboutData?.amount && aboutData?.amount?.length > 0 && <Amounts amounts={aboutData.amount} />}
                        {aboutData?.callAction && aboutData?.callAction?.length > 0 && <CallAction callActions={aboutData.callAction} />}
                    </div>
                </div>
            </div>
        </section>
    );
}
