"use client";

import Header from "../portfolio/Header";

export default function Preview({ menu }) {
    return (
        <section className="flex-1 p-6 overflow-auto border-r bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Vista previa</h3>
            <div className="flex flex-col w-sm mx-auto min-h-screen bg-gradient-to-t from-white to-purple-300 text-gray-800 bg-fixed">
                <Header data={menu} preview />
            </div>
        </section>
    );
}
