import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Search,
  Plus,
  Filter,
  Download,
  Star,
  Home,
} from "lucide-react";

export default function Providers() {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-lg px-6 py-4 flex justify-between items-center border">
          <h2 className="text-xl font-semibold text-[#2c3e50]">
            Providers
          </h2>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Home size={16} className="text-[#0d6efd]" />
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#0d6efd] font-medium">Providers</span>
          </div>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-white rounded-lg border mt-6 p-6">

          <div className="flex flex-wrap gap-4 items-center justify-between">

            {/* LEFT CONTROLS */}
            <div className="flex flex-wrap items-center gap-3">

              <button className="px-5 py-2 rounded border border-[#0d6efd] text-[#0d6efd] bg-[#eaf3ff]">
                All
              </button>

              <button className="px-5 py-2 rounded border border-green-400 text-green-600 bg-green-50">
                Approved
              </button>

              <button className="px-5 py-2 rounded border border-red-400 text-red-500 bg-red-50">
                Disapproved
              </button>

              {/* SEARCH */}
              <div className="flex border rounded overflow-hidden ml-3">
                <input
                  placeholder="Search here!"
                  className="px-4 py-2 outline-none w-[260px]"
                />
                <button className="bg-[#0d6efd] px-4 text-white">
                  <Search size={18} />
                </button>
              </div>

              {/* FILTER */}
              <button className="border rounded px-3 py-2">
                <Filter size={18} />
              </button>

              {/* DOWNLOAD */}
              <button className="border rounded px-4 py-2 flex items-center gap-2">
                <Download size={16} />
                Download
              </button>
            </div>

            {/* ADD PROVIDER */}
            <button className="bg-[#0d6efd] text-white px-5 py-2 rounded flex items-center gap-2 shadow">
              <Plus size={18} />
              Add Provider
            </button>
          </div>

          {/* ================= TABLE ================= */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-sm border-collapse">

              <thead className="bg-[#f3f5f8] text-gray-600">
                <tr>
                  <th className="p-3 text-left">Profile</th>
                  <th className="p-3">Provider Name</th>
                  <th className="p-3">Company Name</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">Stars</th>
                  <th className="p-3">Type</th>
                </tr>
              </thead>

              <tbody className="bg-white">

                {providers.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-[#f9fbff]"
                  >
                    {/* PROFILE */}
                    <td className="p-4 flex gap-3 items-center">
                      <div className="w-12 h-12 border rounded flex items-center justify-center text-gray-400 text-xs">
                        NO IMAGE
                      </div>
                      <div>
                        <p className="font-medium">{p.username}</p>
                        <p className="text-xs text-gray-400">
                          {p.email}
                        </p>
                      </div>
                    </td>

                    <td className="text-center">{p.provider}</td>
                    <td className="text-center">{p.company}</td>
                    <td className="text-center">{p.slug}</td>
                    <td className="text-center">{p.mobile}</td>

                    <td className="text-center">
                      <span className="inline-flex items-center gap-1 text-orange-400">
                        <Star size={16} fill="orange" />
                        (0.0)
                      </span>
                    </td>

                    <td className="text-center">{p.type}</td>
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

/* ================= MOCK DATA ================= */

const providers = [
  {
    username: "Dixit_05",
    email: "wrteam.dixit07@gmail.com",
    provider: "Dixit_05",
    company: "Snap Cleaning",
    slug: "snap-cleaning",
    mobile: "XXXXX0925",
    type: "Individual",
  },
  {
    username: "mamekha",
    email: "wrteam.ai124@gmail.com",
    provider: "mamekha",
    company: "ALSEN",
    slug: "alsen",
    mobile: "XXXXX792",
    type: "Individual",
  },
  {
    username: "jit806",
    email: "wrteam.or@cemya.in",
    provider: "jit806",
    company: "Cemya green private limited",
    slug: "cemya-green-private-limited",
    mobile: "XXXXX2641",
    type: "Individual",
  },
  {
    username: "yours",
    email: "wrteam.arunkumarav@gmail.com",
    provider: "yours",
    company: "hello",
    slug: "hello",
    mobile: "XXXXX0713",
    type: "Individual",
  },
  {
    username: "stevo",
    email: "wrteam.nekwunife@gmail.com",
    provider: "stevo",
    company: "Aimsty Group",
    slug: "aimsty-group",
    mobile: "XXXXX9194",
    type: "Individual",
  },
];
