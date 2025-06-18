export default function AmountForm({ amountData, setAmountData }) {
    const handleChange = (index, field, value) => {
        const updated = [...amountData];
        updated[index][field] = value;
        setAmountData(updated);
    };

    const handleAdd = () => {
        setAmountData([...amountData, { title: "", value: "" }]);
    };

    const handleRemove = (index) => {
        const updated = amountData.filter((_, i) => i !== index);
        setAmountData(updated);
    };

    return (
        <div className="space-y-4">

            {amountData.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    placeholder="Ej. Proyectos Completados"
                    className="flex-1 border rounded px-3 py-2"
                />
                <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleChange(index, "value", e.target.value)}
                    placeholder="Ej. 150"
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
                className="text-blue-600 text-sm mt-2"
            >
                + Añadir cifra
            </button>
        </div>
    );
}
