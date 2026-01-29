import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Filter, Download, Pencil } from "lucide-react";

export default function CashCollectionPage() {
  const data = [
    { id: 293, name: "Sameera", commission: 141 },
    { id: 270, name: "amarik", commission: 49 },
    { id: 260, name: "Strombrand", commission: 200 },
    { id: 50, name: "Electric", commission: 26028 },
  ];
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f5f7fb] min-h-screen">
        {/* ===== Header ===== */}
        <div className="bg-white rounded-lg p-5 mb-6 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Cash Collection
            </h2>
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">
              ?
            </span>
          </div>

          <div className="text-sm text-gray-500">
            Dashboard / Provider /{" "}
            <span className="text-blue-600">Cash Collection</span>
          </div>
        </div>

        {/* ===== Table Card ===== */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          {/* Controls */}
          <div className="flex items-center gap-3 mb-5">
            {/* Search */}
            <div className="flex border rounded-md overflow-hidden w-[320px]">
              <input
                type="text"
                placeholder="Search here!"
                className="px-4 py-2 w-full outline-none text-sm"
              />
              <button className="bg-blue-600 px-4 text-white">
                <Search size={18} />
              </button>
            </div>

            {/* Filter */}
            <button className="border px-3 py-2 rounded-md">
              <Filter size={18} />
            </button>

            {/* Download */}
            <button className="border px-4 py-2 rounded-md text-sm flex items-center gap-2">
              <Download size={16} />
              Download
            </button>

            {/* Bulk Cash Collection */}
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md text-sm">
              Bulk Cash Collection
            </button>
          </div>

          {/* ===== Table ===== */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#f3f4f8] text-gray-600">
                <tr>
                  <th className="p-3">
                    <input type="checkbox" />
                  </th>
                  <th className="p-3 text-left">Partner Id</th>
                  <th className="p-3 text-center">Provider name</th>
                  <th className="p-3 text-center">Commission</th>
                  <th className="p-3 text-center">Operations</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b transition ${
                      index % 2 === 1 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>

                    <td className="p-3">{item.id}</td>

                    <td className="p-3 text-center text-blue-600 font-medium">
                      {item.name}
                    </td>

                    <td className="p-3 text-center font-semibold">
                      {item.commission}
                    </td>

                    <td className="p-3 text-center">
                      <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md shadow">
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
            <div>Showing 1 to 4 of 4 entries</div>

            <div className="flex items-center gap-2">
              <select className="border rounded px-2 py-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>entries per page</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
