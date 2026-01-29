import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Filter, Download, Pencil } from "lucide-react";

export default function SettlementsPage() {
  const data = [
    { id: 3154, company: "Test Company", name: "mere", balance: 0 },
    { id: 3152, company: "ipro", name: "bob", balance: 0 },
    { id: 3149, company: "Snap Cleaning", name: "Dixit_05", balance: 0 },
    { id: 3148, company: "ALSEN", name: "mamekha", balance: 0 },
    {
      id: 3140,
      company: "Cemya green private limited",
      name: "jit806",
      balance: 0,
    },
    { id: 3139, company: "hello", name: "yours", balance: 0 },
    { id: 3136, company: "Aimsty Group", name: "stevo", balance: 0 },
  ];
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f5f7fb] min-h-screen">
        {/* ===== Header ===== */}
        <div className="bg-white rounded-lg p-5 mb-6 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800">Settlement</h2>
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">
              ?
            </span>
          </div>

          <div className="text-sm text-gray-500">
            Dashboard / Provider /{" "}
            <span className="text-blue-600">Settlement</span>
          </div>
        </div>

        {/* ===== Table Card ===== */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          {/* Top Controls */}
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

            {/* Bulk Settlement */}
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md text-sm">
              Bulk Settlement
            </button>
          </div>

          {/* ===== Table ===== */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#f3f4f8] text-gray-600">
                <tr>
                  <th className="p-3 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="p-3 text-left">Provider Id</th>
                  <th className="p-3 text-center">Company Name</th>
                  <th className="p-3 text-center">Provider Name</th>
                  <th className="p-3 text-center">Balance</th>
                  <th className="p-3 text-center">Operations</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>

                    <td className="p-3">{item.id}</td>

                    <td className="p-3 text-center">{item.company}</td>

                    <td className="p-3 text-center">{item.name}</td>

                    <td className="p-3 text-center">{item.balance}</td>

                    <td className="p-3 text-center">
                      <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md">
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
