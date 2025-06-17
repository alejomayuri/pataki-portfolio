import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AmountForm from "./aboutForm/AmountForm";
import CallActionForm from "./aboutForm/CallActionForm";

export default function AboutForm({ 
  user, 
  currentImage, 
  currentName, 
  currentSocial, 
  currentDescription, 
  currentAmount, 
  currentCallAction,
  setName, 
  setSocial, 
  setDescription, 
  setAmount, 
  setCallAction,
  handleImageUpload }) {

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSave = async () => {
    if (!user || !currentImage || !currentName) return;

    setLoading(true);
    setSuccess(false);

    try {
      const userRef = doc(db, "usuarios", user.uid);
      await updateDoc(userRef, {
        "portfolio.about.mainImage": currentImage,
        "portfolio.about.mainName": currentName,
        "portfolio.about.social": {
          facebook: currentSocial?.facebook || "",
          twitter: currentSocial?.twitter || "",
          instagram: currentSocial?.instagram || "",
          linkedin: currentSocial?.linkedin || "",
        },
        "portfolio.about.description": currentDescription || "",
        "portfolio.about.amount": currentAmount || [],
        "portfolio.about.callAction": currentCallAction || [],
      });
      setSuccess(true);
    } catch (err) {
      console.error("Error al guardar la imagen en Firestore:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
        <label className="block">
            <h3 className="text-lg font-semibold">Imagen principal del about</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
        </label>

        {currentImage && (
            <img src={currentImage} alt="Main About" className="w-full rounded-md shadow-md" />
        )}

        <label className="block">
            <h3 className="text-lg font-semibold">Nombre para mostrar</h3>
            <input
                type="text"
                value={currentName}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
            />
        </label>

        <label className="block">
            <h3 className="text-lg font-semibold">Redes sociales</h3>
            <div>
                <input
                    type="text"
                    placeholder="Facebook"
                    value={currentSocial?.facebook || ""}
                    onChange={(e) => setSocial({ ...currentSocial, facebook: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                />
                <input
                    type="text"
                    placeholder="Twitter"
                    value={currentSocial?.twitter || ""}
                    onChange={(e) => setSocial({ ...currentSocial, twitter: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                />
                <input
                    type="text"
                    placeholder="Instagram"
                    value={currentSocial?.instagram || ""}
                    onChange={(e) => setSocial({ ...currentSocial, instagram: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                />
                <input
                    type="text"
                    placeholder="LinkedIn"
                    value={currentSocial?.linkedin || ""}
                    onChange={(e) => setSocial({ ...currentSocial, linkedin: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                />
            </div>
        </label>

        <label>
          <h3 className="text-lg font-semibold">Descripción</h3>
          <textarea
            placeholder="Escribe una breve descripción sobre ti..."
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
            rows="4"
            value={currentDescription || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
            <AmountForm
                amountData={currentAmount || []}
                setAmountData={(amount) => setAmount(amount)}
            />
        </label>
        <label>
            <CallActionForm
                callActionData={currentCallAction || []}
                setCallActionData={(callAction) => setCallAction(callAction)}
            />
        </label>
        <button
            onClick={handleSave}
            disabled={loading || uploading}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
            {loading ? "Guardando..." : "Guardar cambios"}
        </button>

        {success && <p className="text-green-600 text-sm">¡Cambios guardados correctamente!</p>}
    </div>
  );
}
