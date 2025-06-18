export default function Social({ data, setData }) {
    const setSocial = (social) => {
        setData(social);
    };

    return (
        <div className="space-y-4">
            <div>
                <input
                    type="text"
                    placeholder="Facebook"
                    value={data?.facebook || ""}
                    onChange={(e) => setSocial({ ...data, facebook: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                />
                <input
                    type="text"
                    placeholder="Twitter"
                    value={data?.twitter || ""}
                    onChange={(e) => setSocial({ ...data, twitter: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                />
                <input
                    type="text"
                    placeholder="Instagram"
                    value={data?.instagram || ""}
                    onChange={(e) => setSocial({ ...data, instagram: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                />
                <input
                    type="text"
                    placeholder="LinkedIn"
                    value={data?.linkedin || ""}
                    onChange={(e) => setSocial({ ...data, linkedin: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                />
            </div>
        </div>
    );
}