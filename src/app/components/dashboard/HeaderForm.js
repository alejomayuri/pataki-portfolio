import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function HeaderForm({ user, userDataForm, setUserDataForm, imageUploader, uploading }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const setTitle = (title) => {
        setUserDataForm((prev) => ({ ...prev, title }));
    };

    const handleImageUpload = (e) => {
        imageUploader(e, (url) => 
            setUserDataForm((prev) => ({...prev, profileImage: url }))
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setSuccess(false);

        try {
        const userRef = doc(db, "usuarios", user.uid);
        await updateDoc(userRef, {
            "portfolio.title": userDataForm?.title,
            "portfolio.profileImage": userDataForm?.profileImage,
        });
        setSuccess(true);
        } catch (err) {
        console.error("Error al guardar los datos:", err);
        } finally {
        setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Título o nombre para mostrar</label>
                <input
                    type="text"
                    placeholder="Diseñador freelance, Ilustrador, etc."
                    value={userDataForm?.title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Sube tu foto de perfil</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border border-gray-300 rounded-xl p-3"
                />
                {uploading && <p className="text-sm text-gray-500">Subiendo imagen...</p>}
                {userDataForm?.profileImage && (
                    <img
                        src={userDataForm?.profileImage}
                        alt="Preview"
                        className="mt-2 w-24 h-24 rounded-full object-cover"
                    />
                )}
            </div>

            <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Guardando..." : "Guardar cambios"}
            </button>

            {success && <p className="text-green-600 mt-2">¡Datos guardados con éxito!</p>}
        </form>
    );
}
