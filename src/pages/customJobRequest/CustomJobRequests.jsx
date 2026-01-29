import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Home } from "lucide-react";

export default function CustomJobRequestsPage() {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">

        {/* HEADER */}
        <div className="bg-white rounded-xl border border-gray-300 px-6 py-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Custom Job Requests
          </h2>

          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Home size={16} className="text-blue-600" />
            Dashboard / Custom Job Requests
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl border border-gray-300 p-6">

          {/* SEARCH BAR */}
          <div className="flex gap-4 items-center mb-6">
            <div className="flex">
              <input
                placeholder="Search here!"
                className="border border-gray-300 rounded-l-md px-4 py-2 w-[260px] outline-none"
              />
              <button className="bg-[#0d6efd] text-white px-4 rounded-r-md">
                <Search size={18} />
              </button>
            </div>

            <button className="border border-gray-300 px-4 py-2 rounded-md text-sm">
              Download ▾
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">

              <thead>
                <tr className="bg-[#f2f2f6] text-gray-600">
                  <th className="p-3">ID</th>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Short Description</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Total Bids</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">View More</th>
                </tr>
              </thead>

              <tbody>
                <Row
                  id="312"
                  user="-"
                  title="testing"
                  desc="789"
                  category="Home Services"
                  bids="0"
                  status="Cancelled"
                />

                <Row
                  id="313"
                  user="-"
                  title="testing"
                  desc="78"
                  category="Home Services"
                  bids="0"
                  status="Cancelled"
                />

                <Row
                  id="314"
                  user="-"
                  title="testing home 1"
                  desc="test"
                  category="Home Services"
                  bids="1"
                  status="Booked"
                />

                <Row
                  id="315"
                  user="-"
                  title="testing 2"
                  desc="etsi..."
                  category="Home Services"
                  bids="1"
                  status="Booked"
                />

                <Row
                  id="316"
                  user="-"
                  title="date time test"
                  desc="date..."
                  category="Home Services"
                  bids="1"
                  status="Booked"
                />

                <Row
                  id="317"
                  user="-"
                  title="testing painter"
                  desc="I wan..."
                  category="Pest Control Services"
                  bids="0"
                  status="Cancelled"
                />

                <Row
                  id="318"
                  user="Devix Qatar"
                  title="bobon"
                  desc="hhh b..."
                  category="Plumbing Services"
                  bids="0"
                  status="Cancelled"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= ROW ================= */

function Row({
  id,
  user,
  title,
  desc,
  category,
  bids,
  status,
}) {
  return (
    <tr className="border-b border-gray-200">
      <td className="p-4">{id}</td>
      <td className="p-4">{user}</td>
      <td className="p-4">{title}</td>
      <td className="p-4">{desc}</td>
      <td className="p-4">{category}</td>
      <td className="p-4">{bids}</td>
      <td className="p-4">{status}</td>
      <td className="p-4">
        <button className="border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-50">
          View Details
        </button>
      </td>
    </tr>
  );
}
