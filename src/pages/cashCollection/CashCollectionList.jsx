import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Filter, Download } from "lucide-react";

export default function CashCollectionListPage() {
  const data = [
    {
      provider: "Plumbhelp Pvt Ltd",
      message: "test",
      amount: 24,
      bookingId: "-",
      date: "2026-01-12",
    },
    {
      provider: "Electric",
      message: "provider received cash",
      amount: 10,
      bookingId: 7266,
      date: "2026-01-12",
    },
    {
      provider: "Electric",
      message: "provider received cash",
      amount: 3,
      bookingId: 9215,
      date: "2025-12-26",
    },
    {
      provider: "Electric",
      message: "provider received cash",
      amount: 25010,
      bookingId: 9246,
      date: "2025-12-24",
    },
    {
      provider: "Electric",
      message: "provider received cash",
      amount: 6,
      bookingId: 9236,
      date: "2025-12-22",
    },
    {
      provider: "Electric",
      message: "provider received cash",
      amount: 6,
      bookingId: 9220,
      date: "2025-12-20",
    },
    {
      provider: "Electric",
      message: "provider received cash",
      amount: 3,
      bookingId: 9226,
      date: "2025-12-19",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 bg-[#f5f7fb] min-h-screen">
        {/* ===== Header ===== */}
        <div className="bg-white rounded-lg p-5 mb-6 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Cash Collection List
            </h2>
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">
              ?
            </span>
          </div>

          <div className="text-sm text-gray-500">
            Dashboard / Provider /{" "}
            <span className="text-blue-600">Cash Collection List</span>
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
                  <th className="p-3 text-center">Provider name</th>
                  <th className="p-3 text-center">Message</th>
                  <th className="p-3 text-center">Amount</th>
                  <th className="p-3 text-center">Booking id</th>
                  <th className="p-3 text-center">Date</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-center text-blue-600 font-medium">
                      {item.provider}
                    </td>

                    <td className="p-3 text-center">{item.message}</td>

                    <td className="p-3 text-center font-semibold">
                      {item.amount}
                    </td>

                    <td className="p-3 text-center">{item.bookingId}</td>

                    <td className="p-3 text-center">{item.date}</td>
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
