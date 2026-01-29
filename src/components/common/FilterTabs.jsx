import React from "react";

export default function FilterTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
            activeTab === tab.id
              ? tab.activeClass || "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
