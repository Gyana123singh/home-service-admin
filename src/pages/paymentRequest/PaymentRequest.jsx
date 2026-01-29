import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Search,
  Filter,
  Check,
  HelpCircle,
  Home,
} from "lucide-react";

export default function PaymentRequest() {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">

        {/* PAGE HEADER */}
        <div className="bg-white rounded-xl border border-gray-300 px-6 py-4 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Payment Request</h2>
            <HelpCircle className="text-blue-600" size={20} />
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Home size={16} className="text-blue-600" />
            Dashboard / Provider / Payment Request
          </div>
        </div>

        {/* NOTE */}
        <div className="bg-[#39b5ec] text-white px-6 py-4 rounded-lg mb-6 text-sm">
          ⚠️ Note: To enable bulk status dropdown, you need to first select atleast one record in table by clicking on the checkbox.
        </div>

        {/* FILTER BAR */}
        <div className="bg-white border border-gray-300 rounded-xl p-6 mb-6">

          <div className="flex flex-wrap gap-4 items-center">

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

            {/* STATUS */}
            <select className="border border-gray-300 px-4 py-2 rounded-md text-sm w-[200px]">
              <option>Pending</option>
              <option>Settled</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#f2f2f6] text-gray-600">
                  <th className="p-3 text-center">
                    <input type="checkbox" />
                  </th>
                  <th className="p-3">User id</th>
                  <th className="p-3">Provider Name</th>
                  <th className="p-3">User Type</th>
                  <th className="p-3">Payment Address</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Operations</th>
                </tr>
              </thead>

              <tbody>

                {/* ROW 1 */}
                <Row
                  status="Settled"
                  statusColor="orange"
                  amount="100"
                  address="UPI@gmail.com"
                />

                {/* ROW 2 */}
                <Row
                  status="Pending"
                  amount="1120"
                  address="1122 1222 1112 1122"
                />

                <Row
                  status="Pending"
                  amount="0"
                  address="abu"
                />

                <Row
                  status="Pending"
                  amount="0"
                  address=""
                />

                <Row
                  status="Pending"
                  amount="610"
                  address="bbb"
                />

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ===================== ROW ===================== */

function Row({ status, amount, address, statusColor }) {
  return (
    <tr className="border-b border-gray-200">
      <td className="p-4 text-center">
        <input type="checkbox" />
      </td>
      <td className="p-4">50</td>
      <td className="p-4">Electric</td>
      <td className="p-4 text-blue-600">Provider</td>
      <td className="p-4">{address}</td>
      <td className="p-4">{amount}</td>
      <td className="p-4">
        {status === "Settled" ? (
          <span className="border border-orange-400 text-orange-500 px-3 py-1 rounded-md text-xs">
            Settled
          </span>
        ) : (
          <span className="border border-gray-600 px-3 py-1 rounded-md text-xs">
            Pending
          </span>
        )}
      </td>
      <td className="p-4 text-center">
        {status === "Pending" && (
          <button className="bg-green-500 text-white p-2 rounded-md">
            <Check size={16} />
          </button>
        )}
      </td>
    </tr>
  );
}
