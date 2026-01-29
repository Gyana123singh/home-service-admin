import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Filter, Download } from "lucide-react";

export default function SettlementHistoryPage() {
  const data = [
    { id: 50, name: "Electric", message: "test", status: "Credit", amount: 500 },
    { id: 273, name: "Jack", message: "test", status: "Credit", amount: 5 },
    {
      id: 273,
      name: "Jack",
      message: "settlerd the amount",
      status: "Credit",
      amount: 10,
    },
    {
      id: 273,
      name: "Jack",
      message: "settlerd the amount",
      status: "Credit",
      amount: 100,
    },
    { id: 50, name: "Electric", message: "test", status: "Credit", amount: 1078 },
    {
      id: 293,
      name: "Sameera",
      message: "work amount",
      status: "Credit",
      amount: 1446,
    },
    {
      id: 303,
      name: "Himani",
      message: "Settled",
      status: "Credit",
      amount: 50,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 bg-[#f5f7fb] min-h-screen">

        {/* ===== Header ===== */}
        <div className="bg-white rounded-lg p-5 mb-6 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Settlement History
            </h2>
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">
              ?
            </span>
          </div>

          <div className="text-sm text-gray-500">
            Dashboard / Provider /{" "}
            <span className="text-blue-600">Settlement History</span>
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
          </div>

          {/* ===== Table ===== */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">

              <thead className="bg-[#f3f4f8] text-gray-600">
                <tr>
                  <th className="p-3 text-left">Provider Id</th>
                  <th className="p-3 text-center">Provider name</th>
                  <th className="p-3 text-center">Message</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Amount</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{item.id}</td>

                    <td className="p-3 text-center text-blue-600 font-medium">
                      {item.name}
                    </td>

                    <td className="p-3 text-center">
                      {item.message}
                    </td>

                    <td className="p-3 text-center">
                      <span className="text-green-600 font-medium">
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3 text-center font-semibold">
                      {item.amount}
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
