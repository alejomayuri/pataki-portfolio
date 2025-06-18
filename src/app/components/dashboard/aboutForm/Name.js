export default function Name({ data, setData }) {
    const handleChange = (e) => {
        setData(e.target.value);
    }

    return (
        <div className="space-y-4">
            <input
                type="text"
                value={data || ""}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
            />
        </div>
    );
}