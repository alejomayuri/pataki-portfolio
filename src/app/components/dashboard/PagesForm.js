import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function PagesForm({ user, userDataForm, setUserDataForm }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Nuevos estados para crear una página
    const [pageName, setPageName] = useState("");
    const [pageType, setPageType] = useState("photo");
    console.log("userDataForm", userDataForm);
    const handleAddPage = () => {
        if (!pageName.trim()) return;

        const newPage = {
            name: pageName.trim(),
            type: pageType,
            id: crypto.randomUUID(), // puedes usar una id única para manejo futuro
            slug: pageName.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")
        };

        const updatedPages = [...(userDataForm.pages || []), newPage];

        setUserDataForm((prev) => ({
            ...prev,
            pages: updatedPages,
        }));

        // Reset campos
        setPageName("");
        setPageType("photo");
    };

    const handleDeletePage = (id) => {
        const updatedPages = userDataForm.pages.filter((page) => page.id !== id);
        setUserDataForm((prev) => ({
            ...prev,
            pages: updatedPages,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setSuccess(false);

        try {
            const userRef = doc(db, "usuarios", user.uid);
            await updateDoc(userRef, {
                "portfolio.pages": userDataForm?.pages || [],
            });
            setSuccess(true);
        } catch (err) {
            console.error("Error al guardar los datos:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">
                    Añadir nueva página
                </label>
                <input
                    type="text"
                    placeholder="Ej: Galería de retratos"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-3 mb-3"
                />

                <select
                    value={pageType}
                    onChange={(e) => setPageType(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-3 mb-3"
                >
                    <option value="photo">Fotos</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                    <option value="text">Texto</option>
                    <option value="link">Link externo</option>
                </select>

                <button
                    type="button"
                    onClick={handleAddPage}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl w-full"
                >
                    Agregar página
                </button>
            </div>

            {/* Lista de páginas añadidas */}
            {userDataForm.pages.map((page) => (
                <div
                    key={page.id}
                    className="flex items-center justify-between border border-gray-200 p-3 rounded-xl bg-white"
                >
                    <div>
                        <span className="font-medium">{page.name}</span>
                        <span className="ml-2 text-sm text-gray-500">({page.type})</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleDeletePage(page.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                    >
                        Eliminar
                    </button>
                </div>
            ))}

            <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 w-full"
            >
                {loading ? "Guardando..." : "Guardar cambios"}
            </button>

            {success && <p className="text-green-600 mt-2">¡Datos guardados con éxito!</p>}
        </form>
    );
}
