export default function HeaderForm({ handleSubmit, handleImageUpload, loading, success, uploading, profileImage, title, setTitle }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Título o nombre para mostrar</label>
                <input
                    type="text"
                    placeholder="Diseñador freelance, Ilustrador, etc."
                    value={title}
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
                {profileImage && (
                    <img
                        src={profileImage}
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
