import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Home, MoreVertical } from "lucide-react";

export default function SlidersPage() {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">

        {/* HEADER */}
        <div className="bg-white rounded-xl border border-gray-300 px-6 py-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sliders</h2>

          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Home size={16} className="text-blue-600" />
            Dashboard / Sliders
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">

          {/* LEFT — ADD SLIDER */}
          <div className="col-span-12 xl:col-span-4 bg-white rounded-xl border border-gray-300">

            {/* HEADER */}
            <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center">
              <h3 className="font-semibold">Add New Slider</h3>

              {/* TOGGLE */}
              <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Active
                <span className="w-5 h-5 bg-white rounded-full"></span>
              </div>
            </div>

            {/* FORM */}
            <div className="p-6 space-y-6">

              {/* TYPE */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Type <span className="text-red-500">*</span>
                </label>

                <select className="w-full border border-gray-300 rounded-md px-4 py-2.5 outline-none">
                  <option>Select Type</option>
                </select>
              </div>

              {/* APP IMAGE */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  App Image <span className="text-red-500">*</span>{" "}
                  <span className="text-xs text-gray-400">
                    (We recommend 345 × 145 pixels)
                  </span>
                </label>

                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500 bg-gray-50">
                  Drag & Drop files here or{" "}
                  <span className="underline cursor-pointer">
                    Browse Files
                  </span>
                </div>
              </div>

              {/* WEB IMAGE */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Web Image <span className="text-red-500">*</span>{" "}
                  <span className="text-xs text-gray-400">
                    (We recommend use 1920 × 700)
                  </span>
                </label>

                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500 bg-gray-50">
                  Drag & Drop files here or{" "}
                  <span className="underline cursor-pointer">
                    Browse Files
                  </span>
                </div>
              </div>

              <button className="bg-[#0d6efd] text-white px-6 py-2 rounded-md text-sm float-right">
                Add New Slider
              </button>
            </div>
          </div>

          {/* RIGHT — ALL SLIDERS */}
          <div className="col-span-12 xl:col-span-8 bg-white rounded-xl border border-gray-300">

            <div className="px-6 py-4 border-b border-gray-300">
              <h3 className="font-semibold">All Sliders</h3>
            </div>

            <div className="p-6">

              {/* FILTER BAR */}
              <div className="flex flex-wrap gap-4 items-center mb-6">

                <button className="px-4 py-1.5 border border-green-500 text-green-600 rounded-md text-sm">
                  Active
                </button>

                <button className="px-4 py-1.5 border border-red-500 text-red-600 rounded-md text-sm">
                  Deactive
                </button>

                <div className="flex">
                  <input
                    placeholder="Search here!"
                    className="border border-gray-300 rounded-l-md px-4 py-2 w-[240px] outline-none"
                  />
                  <button className="bg-[#0d6efd] text-white px-4 rounded-r-md">
                    <Search size={18} />
                  </button>
                </div>

                <button className="border border-gray-300 px-3 py-2 rounded-md">
                  🔽
                </button>

                <button className="border border-gray-300 px-4 py-2 rounded-md text-sm">
                  Download ▾
                </button>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">

                  <thead>
                    <tr className="bg-[#f2f2f6] text-gray-600">
                      <th className="p-3">ID</th>
                      <th className="p-3">App Image</th>
                      <th className="p-3">Web Image</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Created At</th>
                      <th className="p-3">Operations</th>
                    </tr>
                  </thead>

                  <tbody>
                    <SliderRow id="39" />
                    <SliderRow id="38" />
                  </tbody>
                </table>

                {/* FOOTER */}
                <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                  Showing 1 to 2 of 2 entries
                  <select className="border border-gray-300 rounded px-2 py-1">
                    <option>10</option>
                  </select>
                  entries per page
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= ROW ================= */

function SliderRow({ id }) {
  return (
    <tr className="border-b border-gray-200 text-center">
      <td className="p-4">{id}</td>

      <td className="p-4">
        <img
          src="https://edemand.wrteam.me/public/uploads/slider/1692079864.png"
          className="w-12 h-12 rounded-lg mx-auto"
          alt=""
        />
      </td>

      <td className="p-4">
        <img
          src="https://edemand.wrteam.me/public/uploads/slider/1692079864.png"
          className="w-12 h-12 rounded-lg mx-auto"
          alt=""
        />
      </td>

      <td className="p-4">Category</td>

      <td className="p-4">
        <span className="border border-green-500 text-green-600 px-3 py-1 rounded-md text-xs">
          Active
        </span>
      </td>

      <td className="p-4">14-11-2022</td>

      <td className="p-4">
        <button className="border border-gray-300 p-2 rounded-md">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}
