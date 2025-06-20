import { useEffect, useState } from "react";

export default function LateralMenu({ menuItems, activeSection, setActiveSection }) {
    console.log("menuItems", menuItems)
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
                        {item.items && item.items.length > 0 && (
                            <div
                                className="mt-1 flex flex-wrap flex-col text-sm text-gray-500"
                            >
                                {item.items.map((subItem, index) => (
                                    <span key={index} className="ml-2 text-sm text-gray-500">
                                        {subItem.name}
                                    </span>
                                ))}
                            </div>
                            )}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
