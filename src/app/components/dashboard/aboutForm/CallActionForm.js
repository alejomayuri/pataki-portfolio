export default function CallActionForm({ callActionData, setCallActionData }) {
    const handleChange = (index, field, value) => {
        const updated = [...callActionData];
        updated[index][field] = value;
        setCallActionData(updated);
    };
    console.log("callActionData", callActionData)

    const handleAdd = () => {
        setCallActionData([...callActionData, { title: "", url: "" }]);
    };

    const handleRemove = (index) => {
        const updated = callActionData.filter((_, i) => i !== index);
        setCallActionData(updated);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links destacados</h3>

            {callActionData.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    placeholder="Expo en galería de arte"
                    className="flex-1 border rounded px-3 py-2"
                />
                <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleChange(index, "url", e.target.value)}
                    placeholder="https://tusitio.com"
                    className="w-24 border rounded px-3 py-2"
                />
                <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-red-600 text-sm"
                >
                    ✕
                </button>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAdd}
                className="text-blue-600 text-sm mt-2 cursor-pointer"
            >
                + Añadir link destacado
            </button>
        </div>
    );
}
