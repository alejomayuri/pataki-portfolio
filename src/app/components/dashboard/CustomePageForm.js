import TypePhotoForm from "./customePage/TypePhotoForm";

export default function CustomePageForm({ user, userDataForm, setUserDataForm, imageUploader, uploading, section }) {
    console.log("section", section);

    const setImageColections = (colections) => {
        setUserDataForm((prev) => ({
            ...prev,
            pages: prev.pages.map((page) => page.id === section.id ? { ...page, colections } : page)
        }));
    }

    const setImageColectionName = (name) => {
        setUserDataForm((prev) => ({
            ...prev,
        }));
    }

    return (
        <>
            {section.type === "photo" ? (
                <TypePhotoForm
                    data ={userDataForm?.pages?.find((page) => page.id === section.id)}
                    // handleImageUpload={handleImageUpload}
                    setImageColections={setImageColections}
                    setImageColectionName={setImageColectionName}
                    imageUploader={imageUploader}
                />
            ) : (
                <div className="text-gray-500">Tipo de página no soportado</div>
            )}
        </>
    );
}
