import TypePhotoForm from "./customePage/TypePhotoForm";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function CustomePageForm({ user, userDataForm, setUserDataForm, imageUploader, uploading, section }) {
    console.log("section", section);

    const setImageColections = (colections) => {
        setUserDataForm((prev) => ({
            ...prev,
            pages: prev.pages.map((page) => page.id === section.id ? { ...page, colections } : page)
        }));
    }

    const handleSavePage = async (pageId, newColections) => {
        if (!user) return;

        try {
            const updatedPages = userDataForm.pages.map((page) =>
                page.id === pageId ? { ...page, colections: newColections } : page
            );

            const userRef = doc(db, "usuarios", user.uid);
            await updateDoc(userRef, {
                "portfolio.pages": updatedPages,
            });

            console.log("Colección guardada en Firestore");
        } catch (err) {
            console.error("Error al guardar en Firestore:", err);
        }
    };

    return (
        <>
            {section.type === "photo" ? (
                <TypePhotoForm
                    data ={userDataForm?.pages?.find((page) => page.id === section.id)}
                    // handleImageUpload={handleImageUpload}
                    setImageColections={setImageColections}
                    imageUploader={imageUploader}
                    user={user}
                    onSave={handleSavePage}
                />
            ) : (
                <div className="text-gray-500">Tipo de página no soportado</div>
            )}
        </>
    );
}
