export default function MainImage ({ image, name }) {
    return (
        <>
            {image && (
                <div className="mt-8 mb-6">
                    <img
                        src={image}
                        alt="Foto de perfil"
                        className="w-full h-auto rounded-xl shadow-md"
                    />
                </div>
            )}
            {name && <h1 className="text-lg font-bold mb-4">{name}</h1>}
        </>
    )
}