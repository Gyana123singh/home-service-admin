import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Filter, Home } from "lucide-react";

export default function BookingPaymentPage() {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">

        {/* HEADER */}
        <div className="bg-white rounded-xl border border-gray-300 px-6 py-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Booking Payment Management
          </h2>

          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Home size={16} className="text-blue-600" />
            Dashboard / Booking Payment Management
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl border border-gray-300 p-6">

          {/* FILTER BAR */}
          <div className="flex flex-wrap gap-4 items-center mb-6">

            {/* SEARCH */}
            <div className="flex">
              <input
                placeholder="Search here!"
                className="border border-gray-300 rounded-l-md px-4 py-2 w-[260px] outline-none"
              />
              <button className="bg-[#0d6efd] text-white px-4 rounded-r-md">
                <Search size={18} />
              </button>
            </div>

            {/* FILTER */}
            <button className="border border-gray-300 px-3 py-2 rounded-md">
              <Filter size={18} />
            </button>

            {/* DOWNLOAD */}
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
                  <th className="p-3">Message</th>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Total amount</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Commission amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>

                <Row
                  id="407"
                  msg="Received by admin"
                  provider="Electric"
                  type="Received by admin"
                  date="24-01-2026"
                  time="03:50 AM"
                  total="460"
                  amount="437"
                  commission="23"
                  status="Credit"
                />

                <Row
                  id="406"
                  msg="Received by admin"
                  provider="Electric"
                  type="Received by admin"
                  date="23-01-2026"
                  time="11:52 AM"
                  total="225"
                  amount="214"
                  commission="11"
                  status="Credit"
                />

                <Row
                  id="405"
                  msg="Received by admin"
                  provider="Electric"
                  type="Received by admin"
                  date="22-01-2026"
                  time="05:44 AM"
                  total="120"
                  amount="114"
                  commission="6"
                  status="Credit"
                />

                <Row
                  id="404"
                  msg="Received by admin"
                  provider="Electric"
                  type="Received by admin"
                  date="18-01-2026"
                  time="11:00 AM"
                  total="380"
                  amount="361"
                  commission="19"
                  status="Credit"
                />

                <Row
                  id="403"
                  msg="Received by admin"
                  provider="Electric"
                  type="Received by admin"
                  date="15-01-2026"
                  time="02:23 AM"
                  total="260"
                  amount="247"
                  commission="13"
                  status="Credit"
                />

                <Row
                  id="402"
                  msg="test"
                  provider="Plumbhelp Pvt Ltd"
                  type="Cash collection by admin"
                  date="12-01-2026"
                  time="04:55 AM"
                  total="24"
                  amount="24"
                  commission="0"
                  status="Credit"
                />

                <Row
                  id="401"
                  msg="Settled by admin"
                  provider="Electric"
                  type="Settled by settlement"
                  date="31-01-2012"
                  time="04:49 AM"
                  total="500"
                  amount="500"
                  commission="0"
                  status="Debit"
                />

                <Row
                  id="400"
                  msg=""
                  provider="Electric"
                  type="Settled by payment request"
                  date="12-01-2026"
                  time="04:47 PM"
                  total="100"
                  amount="100"
                  commission="0"
                  status="Debit"
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
  msg,
  provider,
  type,
  date,
  time,
  total,
  amount,
  commission,
  status,
}) {
  return (
    <tr className="border-b border-gray-200">
      <td className="p-4">{id}</td>
      <td className="p-4">{msg}</td>
      <td className="p-4">{provider}</td>
      <td className="p-4">{type}</td>
      <td className="p-4">{date}</td>
      <td className="p-4">{time}</td>
      <td className="p-4">{total}</td>
      <td className="p-4">{amount}</td>
      <td className="p-4">{commission}</td>
      <td className="p-4">
        {status === "Credit" ? (
          <span className="border border-green-500 text-green-600 px-3 py-1 rounded-md text-xs">
            Credit
          </span>
        ) : (
          <span className="border border-red-500 text-red-500 px-3 py-1 rounded-md text-xs">
            Debit
          </span>
        )}
      </td>
    </tr>
  );
}
