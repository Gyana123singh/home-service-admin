import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Filter, Download, MoreVertical, Plus } from "lucide-react";
import { adminServiceApi } from "../../api/services/add-service";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [approvedFilter, setApprovedFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchServices();
  }, [page, statusFilter, approvedFilter]);

  const fetchServices = async () => {
    try {
      const res = await adminServiceApi.getServices({
        page,
        limit,
        search,
        status: statusFilter,
        approvedByAdmin: approvedFilter,
      });

      setServices(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchServices();
  };

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

        <div className="bg-white rounded-lg shadow-sm p-5">

          {/* ===== Top Controls ===== */}
          <div className="flex flex-wrap items-center gap-3 mb-5">

            <button
              onClick={() => setStatusFilter("")}
              className="px-4 py-2 border rounded"
            >
              All
            </button>

            <button
              onClick={() => setStatusFilter("active")}
              className="px-4 py-2 border rounded text-green-600"
            >
              Active
            </button>

            <button
              onClick={() => setStatusFilter("inactive")}
              className="px-4 py-2 border rounded text-red-600"
            >
              Deactive
            </button>

            <button
              onClick={() => setApprovedFilter("true")}
              className="px-4 py-2 border rounded text-orange-600"
            >
              Approved
            </button>

            {/* Search */}
            <div className="flex border rounded-md overflow-hidden w-[320px] ml-3">
              <input
                type="text"
                placeholder="Search here!"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 w-full outline-none text-sm"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 px-4 text-white"
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* ===== Table ===== */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-[#f3f4f8] text-gray-600">
                <tr>
                  <th className="p-3 text-center">Image</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center">Discounted</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Approved</th>
                  <th className="p-3 text-center">Operations</th>
                </tr>
              </thead>

              <tbody>
                {services.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-center">
                      <img
                        src={item.images?.main || "/placeholder.png"}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover mx-auto"
                      />
                    </td>

                    <td className="p-3">{item.title}</td>

                    <td className="p-3 text-center">
                      ₹{item.price}
                    </td>

                    <td className="p-3 text-center">
                      ₹{item.discountedPrice || "-"}
                    </td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          item.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      {item.approvedByAdmin ? (
                        <span className="text-green-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-red-600 font-medium">No</span>
                      )}
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

          {/* ===== Pagination Info ===== */}
          <div className="mt-4 text-sm text-gray-500">
            Total Services: {total}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}