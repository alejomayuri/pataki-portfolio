import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AmountForm from "./aboutForm/AmountForm";
import CallActionForm from "./aboutForm/CallActionForm";
import Description from "./aboutForm/Description";
import Social from "./aboutForm/Social";
import Name from "./aboutForm/Name";

export default function AboutForm({ 
  user,
  uploading,
  userDataForm,
  setUserDataForm,
  imageUploader
}) {

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    imageUploader(e, (url) => 
      setUserDataForm((prev) => ({...prev, about: { ...prev.about, mainImage: url }}))
    )
  }
  const setName = (name) => {
    setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, mainName: name } }))
  }
  const setSocial = (social) => {
    setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, social }}))
  }
  const setDescription = (description) => {
    setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, description } }))
  }
  const setAmount = (amount) => {
    setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, amount } }))
  }
  const setCallAction = (callAction) => {
    setUserDataForm((prev) => ({ ...prev, about: { ...prev.about, callAction } }))
  }
  
  const handleSave = async () => {
    if (!user || !userDataForm?.about?.mainImage || !userDataForm?.about?.mainName) return;

    setLoading(true);
    setSuccess(false);

    try {
      const userRef = doc(db, "usuarios", user.uid);
      await updateDoc(userRef, {
        "portfolio.about.mainImage": userDataForm?.about?.mainImage,
        "portfolio.about.mainName": userDataForm?.about?.mainName,
        "portfolio.about.social": {
          facebook: userDataForm?.about?.social?.facebook || "",
          twitter: userDataForm?.about?.social?.twitter || "",
          instagram: userDataForm?.about?.social?.instagram || "",
          linkedin: userDataForm?.about?.social?.linkedin || "",
        },
        "portfolio.about.description": userDataForm?.about?.description || "",
        "portfolio.about.amount": userDataForm?.about?.amount || [],
        "portfolio.about.callAction": userDataForm?.about?.callAction || [],
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

        {userDataForm?.about?.mainImage && (
            <img src={userDataForm?.about?.mainImage} alt="Main About" className="w-full rounded-md shadow-md" />
        )}

        <label className="block">
            <h3 className="text-lg font-semibold">Nombre para mostrar</h3>
            <Name
                data={userDataForm?.about?.mainName || ""}
                setData={(name) => setName(name)}
            />
        </label>

        <label className="block">
            <h3 className="text-lg font-semibold">Redes sociales</h3>
            <Social
                data={userDataForm?.about?.social || ""}
                setData={(social) => setSocial(social)}
            />
        </label>

        <label>
            <h3 className="text-lg font-semibold">Descripción</h3>
            <Description
                data={userDataForm?.about?.description || ""}
                setData={(description) => setDescription(description)}
            />
        </label>
        <label>
            <h3 className="text-lg font-semibold">Cifras destacadas</h3>
            <AmountForm
                amountData={userDataForm?.about?.amount || []}
                setAmountData={(amount) => setAmount(amount)}
            />
        </label>
        <label>
            <h3 className="text-lg font-semibold">Links destacados</h3>
            <CallActionForm
                callActionData={userDataForm?.about?.callAction || []}
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
