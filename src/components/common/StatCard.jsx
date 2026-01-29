import React from "react";

export default function StatCard({ title, value, icon, onViewDetails }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{title}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      <button
        onClick={onViewDetails}
        className="text-blue-600 text-sm font-medium mt-4 hover:underline"
      >
        View Details →
      </button>
    </div>
  );
}
