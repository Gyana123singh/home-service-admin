import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  ChevronRight,
  Search,
  Download,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Eye,
  X,
} from "lucide-react";

const mockSubscribers = [
  {
    id: 1,
    name: "Test Wrteam Provider",
    email: "wrteam.walevski@fearlessmails.com",
    provider: "Test Wrteam Provider",
    subscription: "Standard",
    purchaseDate: "03-02-2026",
    expiryDate: "04-05-2026",
    price: 50,
    payment: "Success",
    status: "Active",
    description: "Subscribed to Standard plan for basic bookings.",
  },
  {
    id: 2,
    name: "mali",
    email: "wrteam.isodiya919@gmail.com",
    provider: "keer",
    subscription: "Pro Plan",
    purchaseDate: "02-02-2026",
    expiryDate: "01-08-2026",
    price: 999,
    payment: "Failed",
    status: "Deactive",
    description: "Payment failed for Pro plan. Pending retry.",
  },
  {
    id: 3,
    name: "mere",
    email: "wrteam.mail.com",
    provider: "Test Company",
    subscription: "Elite",
    purchaseDate: "28-01-2026",
    expiryDate: "28-01-2027",
    price: 1299,
    payment: "Success",
    status: "Active",
    description: "Elite yearly plan with unlimited bookings.",
  },
  {
    id: 4,
    name: "Alpha Services",
    email: "alpha@provider.com",
    provider: "Alpha Services",
    subscription: "Essential",
    purchaseDate: "25-01-2026",
    expiryDate: "25-04-2026",
    price: 500,
    payment: "Success",
    status: "Active",
    description: "Essential plan for new providers.",
  },
  {
    id: 5,
    name: "Beta Care",
    email: "beta@provider.com",
    provider: "Beta Care",
    subscription: "Standard",
    purchaseDate: "18-01-2026",
    expiryDate: "18-04-2026",
    price: 50,
    payment: "Success",
    status: "Active",
    description: "Standard plan active for 90 days.",
  },
  {
    id: 6,
    name: "Gamma Fix",
    email: "gamma@provider.com",
    provider: "Gamma Fix",
    subscription: "Trial",
    purchaseDate: "15-01-2026",
    expiryDate: "22-01-2026",
    price: 0,
    payment: "Success",
    status: "Deactive",
    description: "Trial expired. Awaiting upgrade.",
  },
  {
    id: 7,
    name: "Delta Works",
    email: "delta@provider.com",
    provider: "Delta Works",
    subscription: "Pro Plan",
    purchaseDate: "10-01-2026",
    expiryDate: "10-07-2026",
    price: 999,
    payment: "Success",
    status: "Active",
    description: "Pro plan active with advanced features.",
  },
  {
    id: 8,
    name: "Omega Solutions",
    email: "omega@provider.com",
    provider: "Omega Solutions",
    subscription: "Elite",
    purchaseDate: "08-01-2026",
    expiryDate: "08-01-2027",
    price: 1299,
    payment: "Failed",
    status: "Deactive",
    description: "Elite plan pending payment verification.",
  },
];

export default function SubscriptionsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  const filteredSubscribers = useMemo(() => {
    return mockSubscribers.filter((item) => {
      const matchesStatus = statusFilter === "All" ? true : item.status === statusFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subscription.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const active = mockSubscribers.filter((item) => item.status === "Active").length;
    const expired = mockSubscribers.filter((item) => item.status === "Deactive").length;
    const expiringSoon = 13;
    const revenue = 0;
    return { active, expired, expiringSoon, revenue };
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredSubscribers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  const handleDownload = () => {
    const csv = [
      [
        "Name",
        "Email",
        "Provider",
        "Subscription",
        "Purchase Date",
        "Expiry Date",
        "Price",
        "Payment",
        "Status",
      ],
      ...filteredSubscribers.map((item) => [
        item.name,
        item.email,
        item.provider,
        item.subscription,
        item.purchaseDate,
        item.expiryDate,
        item.price,
        item.payment,
        item.status,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `subscriber-list-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 bg-[#f6f7fb] min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Subscriber List</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={() => navigate("/")}
              className="text-[#0d6efd] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>🏠 Dashboard</span>
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-800 font-medium">Subscription</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-[#e9ecef] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-xl">
              $
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{stats.revenue}</p>
              <p className="text-sm text-gray-500">This Month's Revenue</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-[#e9ecef] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              ✓
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{stats.active}</p>
              <p className="text-sm text-gray-500">Active Subscription</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-[#e9ecef] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-lg">
              ×
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{stats.expired}</p>
              <p className="text-sm text-gray-500">Expired Subscription</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-[#e9ecef] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-lg">
              ⏱
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{stats.expiringSoon}</p>
              <p className="text-sm text-gray-500">Expiring soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#e9ecef] p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Subscriber List</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={() => {
                setStatusFilter("All");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                statusFilter === "All"
                  ? "bg-[#0d6efd] text-white border-[#0d6efd]"
                  : "text-[#0d6efd] border-[#0d6efd] hover:bg-[#f1f6ff]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setStatusFilter("Active");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                statusFilter === "Active"
                  ? "bg-green-500 text-white border-green-500"
                  : "text-green-600 border-green-500 hover:bg-green-50"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => {
                setStatusFilter("Deactive");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                statusFilter === "Deactive"
                  ? "bg-red-500 text-white border-red-500"
                  : "text-red-600 border-red-500 hover:bg-red-50"
              }`}
            >
              Deactive
            </button>

            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Search here!"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[#0d6efd]"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-[#0d6efd] text-white px-4 rounded-r-md hover:bg-[#0b5ed7] transition-colors">
                <Search size={18} />
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Image</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Provider</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Subscription</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Purchase Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Expiry Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Payment</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Operation</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">{item.name}</p>
                            <p className="text-xs text-gray-400">{item.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{item.provider}</td>
                      <td className="px-4 py-3 text-gray-700">{item.subscription}</td>
                      <td className="px-4 py-3 text-gray-700">{item.purchaseDate}</td>
                      <td className="px-4 py-3 text-gray-700">{item.expiryDate}</td>
                      <td className="px-4 py-3 text-gray-700">{item.price}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium border ${
                            item.payment === "Success"
                              ? "bg-green-50 text-green-600 border-green-400"
                              : "bg-red-50 text-red-600 border-red-400"
                          }`}
                        >
                          {item.payment}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium border ${
                            item.status === "Active"
                              ? "bg-green-50 text-green-600 border-green-400"
                              : "bg-red-50 text-red-600 border-red-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedSubscriber(item)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 hover:bg-gray-50"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                      No subscribers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t gap-4">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredSubscribers.length)} of {filteredSubscribers.length} entries
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md border ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#0d6efd] hover:bg-[#f1f6ff] cursor-pointer"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-1 rounded-md border text-sm ${
                            currentPage === pageNumber
                              ? "bg-[#0d6efd] text-white border-[#0d6efd]"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return (
                        <span key={pageNumber} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md border ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#0d6efd] hover:bg-[#f1f6ff] cursor-pointer"
                  }`}
                >
                  <ChevronRightIcon size={18} />
                </button>
              </div>

              <select
                value={itemsPerPage}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#0d6efd]"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {selectedSubscriber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Subscriber Details</h3>
              <button
                onClick={() => setSelectedSubscriber(null)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="text-gray-800 font-medium">{selectedSubscriber.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-800 font-medium">{selectedSubscriber.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Provider</span>
                <span className="text-gray-800 font-medium">{selectedSubscriber.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Subscription</span>
                <span className="text-gray-800 font-medium">{selectedSubscriber.subscription}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Purchase Date</span>
                <span className="text-gray-800 font-medium">{selectedSubscriber.purchaseDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Expiry Date</span>
                <span className="text-gray-800 font-medium">{selectedSubscriber.expiryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Price</span>
                <span className="text-gray-800 font-medium">{selectedSubscriber.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment</span>
                <span className="text-gray-800 font-medium">{selectedSubscriber.payment}</span>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Description</p>
                <p className="text-gray-800">{selectedSubscriber.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
