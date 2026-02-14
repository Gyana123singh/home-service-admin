import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import {
  ChevronRight,
  Search,
  Trash2,
  Download,
  Send,
  Filter,
  Upload,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";

const mockNotifications = [
  {
    id: 1064,
    title: "Booking status change",
    message: "Your booking status has been confirmed.",
    type: "Booking",
    notificationType: "General",
    image: null,
    date: "2026-02-03",
  },
  {
    id: 1063,
    title: "New Booking Notification",
    message: "You have received a new booking.",
    type: "Booking",
    notificationType: "General",
    image: null,
    date: "2026-02-02",
  },
  {
    id: 1062,
    title: "New Booking Notification",
    message: "You have received a new booking.",
    type: "Booking",
    notificationType: "General",
    image: null,
    date: "2026-02-01",
  },
  {
    id: 1061,
    title: "Promo Alert",
    message: "New promotion has been added for services.",
    type: "Promotion",
    notificationType: "Marketing",
    image: null,
    date: "2026-01-31",
  },
  {
    id: 1060,
    title: "Account Update",
    message: "Please verify your email to keep your account secure.",
    type: "Account",
    notificationType: "General",
    image: null,
    date: "2026-01-30",
  },
  {
    id: 1059,
    title: "Service Update",
    message: "New service categories are now available.",
    type: "Service",
    notificationType: "General",
    image: null,
    date: "2026-01-29",
  },
  {
    id: 1058,
    title: "Settlement Notice",
    message: "Your settlement has been processed successfully.",
    type: "Settlement",
    notificationType: "General",
    image: null,
    date: "2026-01-28",
  },
  {
    id: 1057,
    title: "Support Update",
    message: "Your support ticket has been resolved.",
    type: "Support",
    notificationType: "General",
    image: null,
    date: "2026-01-27",
  },
  {
    id: 1056,
    title: "Payment Reminder",
    message: "A payment is pending. Please complete it soon.",
    type: "Payment",
    notificationType: "Alert",
    image: null,
    date: "2026-01-26",
  },
  {
    id: 1055,
    title: "Maintenance Window",
    message: "Scheduled maintenance on 05-Feb from 1AM to 3AM.",
    type: "System",
    notificationType: "Alert",
    image: null,
    date: "2026-01-25",
  },
];

const recipientOptions = [
  { value: "all-users", label: "All Users" },
  { value: "customers", label: "Customers" },
  { value: "providers", label: "Providers" },
  { value: "admins", label: "Admins" },
];

const notificationTypes = [
  "General",
  "Alert",
  "Marketing",
];

const types = [
  "Booking",
  "Service",
  "Account",
  "Payment",
  "Support",
  "Settlement",
  "Promotion",
  "System",
];

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    sendTo: "all-users",
    type: "",
    title: "",
    message: "",
  });
  const [imageEnabled, setImageEnabled] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = useMemo(() => {
    const base = notifications.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "All" ? true : item.type === filterType;
      return matchesSearch && matchesType;
    });
    return base;
  }, [notifications, searchTerm, filterType]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredNotifications.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Delete this notification?")) {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleDownload = () => {
    const csv = [
      ["ID", "Title", "Message", "Type", "Notification Type", "Date"],
      ...filteredNotifications.map((item) => [
        item.id,
        item.title,
        item.message,
        item.type,
        item.notificationType,
        item.date,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `notification-list-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.type || !formData.title.trim() || !formData.message.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    const newNotification = {
      id: Math.max(1, ...notifications.map((n) => n.id)) + 1,
      title: formData.title,
      message: formData.message,
      type: formData.type,
      notificationType: "General",
      image: imageEnabled ? uploadedImage : null,
      date: new Date().toISOString().split("T")[0],
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setFormData({ sendTo: "all-users", type: "", title: "", message: "" });
    setUploadedImage(null);
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 bg-[#f6f7fb] min-h-screen">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <button
            onClick={() => navigate("/")}
            className="text-[#0d6efd] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>📊 Dashboard</span>
          </button>
          <ChevronRight size={16} />
          <span className="text-gray-800 font-medium">Notifications</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Send Notifications
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Add Notification */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-[#e9ecef] p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Add Notification
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send To <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.sendTo}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, sendTo: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0d6efd] bg-white"
                  >
                    {recipientOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type Notification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, type: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0d6efd] bg-white"
                  >
                    <option value="">Select Type</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Enter the title here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0d6efd]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Enter Message Here"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0d6efd] resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => setImageEnabled((prev) => !prev)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        imageEnabled ? "bg-[#0d6efd]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          imageEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-700">Image</span>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${
                      imageEnabled
                        ? "border-gray-300 bg-gray-50"
                        : "border-gray-200 bg-gray-100 text-gray-400"
                    }`}
                  >
                    {uploadedImage ? (
                      <div className="space-y-3">
                        <img
                          src={uploadedImage}
                          alt="Upload preview"
                          className="mx-auto h-20 w-20 rounded-md object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setUploadedImage(null)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">
                          Drag & Drop files here or
                        </p>
                        <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
                          imageEnabled
                            ? "bg-[#0d6efd] text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}>
                          <Upload size={16} />
                          Browse Files
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={!imageEnabled}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0d6efd] text-white py-2 rounded-md font-medium hover:bg-[#0b5ed7] transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Notifications
                </button>
              </form>
            </div>
          </div>

          {/* Right: Notification List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-[#e9ecef] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Notification List
                </h2>
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <Filter size={16} />
                    <span className="text-sm">Filter</span>
                    <ChevronDown size={16} />
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          setFilterType("All");
                          setFilterOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          filterType === "All" ? "text-[#0d6efd]" : "text-gray-700"
                        }`}
                      >
                        All
                      </button>
                      {types.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setFilterType(type);
                            setFilterOpen(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                            filterType === type ? "text-[#0d6efd]" : "text-gray-700"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search here!"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
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
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d6efd]"></div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Image</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Title</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Message</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Notification Type</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700">Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-gray-900">{item.id}</td>
                              <td className="px-4 py-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt="notification"
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-gray-500">🔔</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-700">{item.title}</td>
                              <td className="px-4 py-3 text-gray-600 max-w-[220px]">
                                {item.message}
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-xs px-2 py-1 rounded font-medium bg-blue-100 text-blue-600">
                                  {item.type}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`text-xs px-2 py-1 rounded font-medium ${
                                  item.notificationType === "Alert"
                                    ? "bg-red-100 text-red-600"
                                    : item.notificationType === "Marketing"
                                    ? "bg-purple-100 text-purple-600"
                                    : "bg-green-100 text-green-600"
                                }`}>
                                  {item.notificationType}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                              No notifications found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t gap-4">
                      <div className="text-sm text-gray-600">
                        Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredNotifications.length)} of {filteredNotifications.length} entries
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
                            if (
                              pageNumber === currentPage - 2 ||
                              pageNumber === currentPage + 2
                            ) {
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
                          <ChevronRight size={18} />
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
