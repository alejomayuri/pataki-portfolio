export default function TypePhotoForm({ data, setImageColections, imageUploader }) {
    const handleAddColection = () => {
        setImageColections(([
            ...data.colections || [], 
            {
                id: Date.now().toString(),
                name: "",
                images: []
            }
        ]))
    }

    const handleImageUpload = (e, index, field) => {
        imageUploader(e, (url) => {
            const updatedColections = [...data.colections];

            if (!updatedColections[index][field]) {
                updatedColections[index][field] = [];
            }

            updatedColections[index][field].push(url);

            setImageColections(updatedColections);
        });
    };

    const handleAddColectionName = (index, field, value) => {
        const updatedColections = [...data.colections];
        updatedColections[index][field] = value;
        setImageColections(updatedColections);
    }

    return (
        <>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Añade fotos a tu galería</h3>
                {data?.colections?.map((collection, index) => (
                    <div key={collection.id} className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <input
                            type="text"
                            placeholder="Nombre de la colección"
                            value={collection.name}
                            onChange={(e) => handleAddColectionName(index, "name", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                        />

                        <label className="block">
                            <h4 className="text-sm font-medium mb-1">Sube imágenes</h4>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, index, "images")}
                                className="mt-1"
                            />
                        </label>

                        {collection?.images && collection?.images?.length > 0 && (
                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {collection.images.map((image, imgIndex) => (
                                    <div key={imgIndex} className="relative">
                                        <img src={image} alt={`Imagen ${imgIndex + 1}`} className="w-full h-auto rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={handleAddColection} type="button" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Añadir colección
                </button>
            </div>
        </>
    );
}
