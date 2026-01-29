import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Filter, Download, MoreVertical, Plus } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
      title: "Pet Dental Care",
      price: 80,
      discount: 75,
      status: "Active",
      approved: "Yes",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      title: "Surgical Procedures",
      price: 50,
      discount: 40,
      status: "Active",
      approved: "Yes",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
      title: "Pet Dental Care",
      price: 80,
      discount: 70,
      status: "Active",
      approved: "Yes",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8",
      title: "Routine Veterinary Checkup",
      price: 50,
      discount: 45,
      status: "Active",
      approved: "Yes",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1601758064224-2b28f1f2e1c8",
      title: "Pet Training",
      price: 100,
      discount: 85,
      status: "Active",
      approved: "Yes",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1558944351-c6f15b93b94d",
      title: "Pet Grooming",
      price: 50,
      discount: 45,
      status: "Active",
      approved: "Yes",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      title: "Dog Walking Service",
      price: 20,
      discount: 18,
      status: "Active",
      approved: "Yes",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 bg-[#f5f7fb] min-h-screen">

        {/* ===== Header ===== */}
        <div className="bg-white rounded-lg p-5 mb-6 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Services</h2>

          <div className="text-sm text-gray-500">
            Dashboard / <span className="text-blue-600">Services</span>
          </div>
        </div>

        {/* ===== Table Card ===== */}
        <div className="bg-white rounded-lg shadow-sm p-5">

          {/* Top Controls */}
          <div className="flex flex-wrap items-center gap-3 mb-5">

            {/* Status buttons */}
            <button className="px-4 py-2 border rounded text-blue-600 border-blue-500 bg-blue-50">
              All
            </button>

            <button className="px-4 py-2 border rounded text-green-600 border-green-500 bg-green-50">
              Active
            </button>

            <button className="px-4 py-2 border rounded text-red-600 border-red-500 bg-red-50">
              Deactive
            </button>

            <button className="px-4 py-2 border rounded text-orange-600 border-orange-500 bg-orange-50">
              Approved
            </button>

            {/* Search */}
            <div className="flex border rounded-md overflow-hidden w-[320px] ml-3">
              <input
                type="text"
                placeholder="Search here!"
                className="px-4 py-2 w-full outline-none text-sm"
              />
              <button className="bg-blue-600 px-4 text-white">
                <Search size={18} />
              </button>
            </div>

            <button className="border px-3 py-2 rounded-md">
              <Filter size={18} />
            </button>

            <button className="border px-4 py-2 rounded-md text-sm flex items-center gap-2">
              <Download size={16} />
              Download
            </button>

            {/* Add service */}
            <button className="ml-auto bg-blue-600 text-white px-5 py-2 rounded-md text-sm flex items-center gap-2 shadow">
              <Plus size={16} />
              Add Service
            </button>
          </div>

          {/* ===== Table ===== */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">

              <thead className="bg-[#f3f4f8] text-gray-600">
                <tr>
                  <th className="p-3 text-center">Image</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center">Discounted Price</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Approved By Admin</th>
                  <th className="p-3 text-center">Operations</th>
                </tr>
              </thead>

              <tbody>
                {services.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 text-center">
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover mx-auto"
                      />
                    </td>

                    <td className="p-3">{item.title}</td>

                    <td className="p-3 text-center">{item.price}</td>

                    <td className="p-3 text-center">{item.discount}</td>

                    <td className="p-3 text-center">
                      <span className="px-3 py-1 rounded border border-green-500 text-green-600 text-xs font-medium">
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3 text-center text-green-600 font-medium">
                      {item.approved}
                    </td>

                    <td className="p-3 text-center">
                      <button className="border rounded px-2 py-1">
                        <MoreVertical size={16} />
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
