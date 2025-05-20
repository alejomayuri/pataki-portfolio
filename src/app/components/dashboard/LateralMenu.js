export default function LateralMenu({ menuItems, activeSection, setActiveSection }) {
    return (
        <aside className="bg-gray-100 border-r p-4">
            <h2 className="font-bold mb-4">Menú</h2>
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item}>
                        <button
                            onClick={() => setActiveSection(item)}
                            className={`w-full text-left px-3 py-2 rounded-lg ${
                                activeSection === item
                                ? "bg-black text-white"
                                : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
