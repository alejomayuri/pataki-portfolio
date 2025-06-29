import { useEffect, useState } from "react";

export default function LateralMenu({ menuItems, activeSection, setActiveSection }) {
    return (
        <aside className="bg-gray-100 border-r p-4">
            <h2 className="font-bold mb-4">Menú</h2>
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item.section}>
                        <a onClick={() => setActiveSection(item.section)}>
                            <p className={`w-full text-left px-3 py-2 rounded-lg ${
                                activeSection === item.section
                                ? "bg-black text-white"
                                : "text-gray-700 hover:bg-gray-200"
                            }`}>
                                {item.name}
                            </p>
                            
                        </a>
                        {item.subitems && item.subitems.length > 0 && (
                            <div
                                className="mt-1 flex flex-wrap flex-col text-sm text-gray-500"
                            >
                                {item.subitems.map((subItem, index) => (
                                    <a key={index} onClick={() => setActiveSection(subItem.section)}>
                                        <span className={`ml-2 text-sm text-gray-500${
                                            activeSection === subItem.section
                                            ? "bg-black text-red-500"
                                            : "text-gray-700 hover:bg-gray-200"
                                        }`}>
                                            {subItem.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
