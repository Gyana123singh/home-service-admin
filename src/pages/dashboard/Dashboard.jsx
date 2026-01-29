import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Users,
  Briefcase,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">

        {/* ================= TOP ROW ================= */}
        <div className="grid grid-cols-12 gap-6">

          {/* Welcome */}
          <div className="col-span-12 xl:col-span-4 bg-[#0d6efd] text-white rounded-lg p-6 h-[140px]">
            <p className="text-sm opacity-90">Good afternoon</p>
            <h2 className="text-xl font-semibold mt-2">Hi, Wrteam</h2>
            <p className="mt-4 text-sm opacity-90">
              View Your Current Sales & Summary.
            </p>
          </div>

          {/* Total Customer */}
          <div className="col-span-12 xl:col-span-4 bg-white rounded-lg border p-6 h-[140px]">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-md">
                <Users className="text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">2169</h3>
                <p className="text-gray-400 text-sm">Total Customer</p>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 px-4 py-2 rounded flex justify-between">
              <span>Total Customer</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Income Revenue */}
          <div className="col-span-12 xl:col-span-4 bg-white rounded-lg border p-6 h-[140px]">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">Income Revenue</h3>

              <div className="flex gap-1">
                <button className="text-xs px-2 py-1 border border-[#0d6efd] text-[#0d6efd] rounded">
                  Total
                </button>
                <button className="text-xs px-2 py-1 border rounded">
                  Admin
                </button>
                <button className="text-xs px-2 py-1 border rounded">
                  Provider
                </button>
              </div>
            </div>

            <div className="h-[70px] bg-[#f9fafc] rounded flex items-center justify-center text-xs text-gray-400">
              Chart
            </div>
          </div>
        </div>

        {/* ================= SECOND ROW ================= */}
        <div className="grid grid-cols-12 gap-6 mt-6">

          <div className="col-span-12 xl:col-span-4 bg-white rounded-lg border p-6 h-[130px]">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-md">
                <Briefcase className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">119</h3>
                <p className="text-gray-400 text-sm">Total Services</p>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 px-4 py-2 rounded flex justify-between">
              <span>Total Services</span>
              <ArrowRight size={16} />
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 bg-white rounded-lg border p-6 h-[130px]">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-md">
                <CalendarCheck className="text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">1243</h3>
                <p className="text-gray-400 text-sm">Booking Statistics</p>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 px-4 py-2 rounded flex justify-between">
              <span>Booking Statistics</span>
              <ArrowRight size={16} />
            </div>
          </div>

        </div>

        {/* ================= THIRD ROW ================= */}
        <div className="grid grid-cols-12 gap-6 mt-6">

          {/* Top Providers */}
          <div className="col-span-12 xl:col-span-8 bg-white rounded-lg border p-6">
            <div className="flex justify-between mb-6">
              <h3 className="font-semibold">Top Providers</h3>
              <select className="border px-2 py-1 text-sm rounded">
                <option>Bookings</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <Provider name="Electric" rating="4.6" count="239 Booking Completed" />
              <Provider name="World Clean Pvt" rating="5.0" count="6 Booking Completed" />
              <Provider name="StormBrand" rating="4.6" count="1 Booking Completed" />
            </div>
          </div>

          {/* Trending */}
          <div className="col-span-12 xl:col-span-4 bg-white rounded-lg border p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Top Trending Services</h3>
              <select className="border px-2 py-1 text-sm rounded">
                <option>All</option>
              </select>
            </div>

            <Trending title="Inverter Setup & Battery Service" count="91" />
            <Trending title="Geyser/Water Heater Repair" count="39" />
            <Trending title="Switch & Socket Repair" count="19" />
            <Trending title="Ceiling Fan Installation" count="14" />
          </div>
        </div>

        {/* ================= BOOKINGS ================= */}
        <div className="bg-white rounded-lg border p-6 mt-6">
          <h3 className="font-semibold mb-4">Recent Booking : 7</h3>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Customer</th>
                <th>Provider</th>
                <th>Starting time</th>
                <th>Ending time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="text-center">
              <tr>
                <td className="p-2">BEST</td>
                <td>TeamWork Group</td>
                <td>29-02-2024 09:30 AM</td>
                <td>29-02-2024 11:30 AM</td>
                <td><span className="text-red-500 border border-red-500 px-2 py-1 rounded text-xs">Cancelled</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}

/* ================= COMPONENTS ================= */

function Provider({ name, rating, count }) {
  return (
    <div className="bg-gray-50 border rounded-lg p-4">
      <div className="w-12 h-12 rounded-full bg-gray-300 mx-auto mb-2" />
      <h4 className="font-medium">{name}</h4>
      <p className="text-orange-400 text-sm">★★★★★ ({rating})</p>
      <button className="mt-3 bg-[#0d6efd] text-white text-xs px-3 py-1 rounded">
        {count}
      </button>
    </div>
  );
}

function Trending({ title, count }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <p className="text-sm">{title}</p>
      <span className="bg-[#0d6efd] text-white text-xs px-2 py-1 rounded">
        {count}
      </span>
    </div>
  );
}
