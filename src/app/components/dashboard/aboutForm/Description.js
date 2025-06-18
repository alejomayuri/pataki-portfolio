export default function Description({ data, setData }) {
    const handleChange = (e) => {
        setData(e.target.value);
    }

    return (
        <div className="space-y-4">
            <textarea
                value={data}
                onChange={handleChange}
                rows={4}
                placeholder="Escribe una breve descripción sobre ti"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
            />
        </div>
    );
}