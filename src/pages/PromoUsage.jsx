import { useState, useMemo } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { FiHome, FiSearch, FiEye, FiDownload, FiChevronDown } from "react-icons/fi";

// Dummy Promo Usage data
const initialUsageData = [
  {
    id: 1,
    usageId: "PU-2026-001",
    promoCode: "WELCOME50",
    userId: "U-1234",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    bookingId: "BK-5678",
    serviceName: "Home Cleaning",
    originalAmount: 1200,
    discountAmount: 600,
    finalAmount: 600,
    usageDate: "2026-01-28",
    usageTime: "10:30 AM",
  },
  {
    id: 2,
    usageId: "PU-2026-002",
    promoCode: "SAVE100",
    userId: "U-2345",
    userName: "Sarah Johnson",
    userEmail: "sarah.j@example.com",
    bookingId: "BK-5679",
    serviceName: "Plumbing Service",
    originalAmount: 1500,
    discountAmount: 100,
    finalAmount: 1400,
    usageDate: "2026-01-28",
    usageTime: "11:15 AM",
  },
  {
    id: 3,
    usageId: "PU-2026-003",
    promoCode: "FIRST20",
    userId: "U-3456",
    userName: "Michael Chen",
    userEmail: "michael.c@example.com",
    bookingId: "BK-5680",
    serviceName: "Electrical Repair",
    originalAmount: 800,
    discountAmount: 160,
    finalAmount: 640,
    usageDate: "2026-01-27",
    usageTime: "02:45 PM",
  },
  {
    id: 4,
    usageId: "PU-2026-004",
    promoCode: "PREMIUM30",
    userId: "U-4567",
    userName: "Emma Wilson",
    userEmail: "emma.w@example.com",
    bookingId: "BK-5681",
    serviceName: "AC Repair",
    originalAmount: 3000,
    discountAmount: 900,
    finalAmount: 2100,
    usageDate: "2026-01-27",
    usageTime: "04:20 PM",
  },
  {
    id: 5,
    usageId: "PU-2026-005",
    promoCode: "WELCOME50",
    userId: "U-5678",
    userName: "David Brown",
    userEmail: "david.b@example.com",
    bookingId: "BK-5682",
    serviceName: "Painting Service",
    originalAmount: 5000,
    discountAmount: 2500,
    finalAmount: 2500,
    usageDate: "2026-01-26",
    usageTime: "09:00 AM",
  },
  {
    id: 6,
    usageId: "PU-2026-006",
    promoCode: "SAVE100",
    userId: "U-6789",
    userName: "Olivia Martinez",
    userEmail: "olivia.m@example.com",
    bookingId: "BK-5683",
    serviceName: "Pest Control",
    originalAmount: 1200,
    discountAmount: 100,
    finalAmount: 1100,
    usageDate: "2026-01-26",
    usageTime: "03:30 PM",
  },
  {
    id: 7,
    usageId: "PU-2026-007",
    promoCode: "FIRST20",
    userId: "U-7890",
    userName: "James Taylor",
    userEmail: "james.t@example.com",
    bookingId: "BK-5684",
    serviceName: "Carpenter Service",
    originalAmount: 2500,
    discountAmount: 500,
    finalAmount: 2000,
    usageDate: "2026-01-25",
    usageTime: "01:15 PM",
  },
  {
    id: 8,
    usageId: "PU-2026-008",
    promoCode: "PREMIUM30",
    userId: "U-8901",
    userName: "Sophia Lee",
    userEmail: "sophia.l@example.com",
    bookingId: "BK-5685",
    serviceName: "Deep Cleaning",
    originalAmount: 4000,
    discountAmount: 1200,
    finalAmount: 2800,
    usageDate: "2026-01-25",
    usageTime: "10:45 AM",
  },
  {
    id: 9,
    usageId: "PU-2026-009",
    promoCode: "WELCOME50",
    userId: "U-9012",
    userName: "Daniel White",
    userEmail: "daniel.w@example.com",
    bookingId: "BK-5686",
    serviceName: "Laundry Service",
    originalAmount: 600,
    discountAmount: 300,
    finalAmount: 300,
    usageDate: "2026-01-24",
    usageTime: "08:30 AM",
  },
  {
    id: 10,
    usageId: "PU-2026-010",
    promoCode: "SAVE100",
    userId: "U-0123",
    userName: "Ava Garcia",
    userEmail: "ava.g@example.com",
    bookingId: "BK-5687",
    serviceName: "Appliance Repair",
    originalAmount: 1800,
    discountAmount: 100,
    finalAmount: 1700,
    usageDate: "2026-01-24",
    usageTime: "12:00 PM",
  },
];

export default function PromoUsagePage() {
  const [usageData, setUsageData] = useState(initialUsageData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [filterPromoCode, setFilterPromoCode] = useState("All");
  const [selectedUsage, setSelectedUsage] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Get unique promo codes
  const promoCodes = ["All", ...new Set(usageData.map(u => u.promoCode))];

  // Filtering and search logic
  const filteredUsageData = useMemo(() => {
    let data = usageData;
    
    // Filter by promo code
    if (filterPromoCode !== "All") {
      data = data.filter(usage => usage.promoCode === filterPromoCode);
    }
    
    // Search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(usage =>
        usage.usageId.toLowerCase().includes(searchLower) ||
        usage.promoCode.toLowerCase().includes(searchLower) ||
        usage.userName.toLowerCase().includes(searchLower) ||
        usage.userEmail.toLowerCase().includes(searchLower) ||
        usage.bookingId.toLowerCase().includes(searchLower) ||
        usage.serviceName.toLowerCase().includes(searchLower)
      );
    }
    
    return data;
  }, [usageData, search, filterPromoCode]);

  // Pagination
  const totalPages = Math.ceil(filteredUsageData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredUsageData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Calculate stats
  const totalDiscount = usageData.reduce((sum, usage) => sum + usage.discountAmount, 0);
  const avgDiscount = usageData.length > 0 ? totalDiscount / usageData.length : 0;

  // View details
  const handleView = (usage) => {
    setSelectedUsage(usage);
    setShowViewModal(true);
  };

  // Download CSV
  const downloadCSV = () => {
    const csvContent = [
      ["Usage ID", "Promo Code", "User Name", "User Email", "Booking ID", "Service", "Original Amount", "Discount", "Final Amount", "Date", "Time"],
      ...filteredUsageData.map(u => [
        u.usageId,
        u.promoCode,
        u.userName,
        u.userEmail,
        u.bookingId,
        u.serviceName,
        u.originalAmount,
        u.discountAmount,
        u.finalAmount,
        u.usageDate,
        u.usageTime
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `promo_usage_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Pagination helpers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
        {/* Header with Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Promo Usage History</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-blue-600 hover:underline transition-colors">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-yellow-600">Promo Usage</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6">
            {/* Search, Filter and Download Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Search Bar */}
              <div className="flex flex-1">
                <input
                  type="text"
                  placeholder="Search by usage ID, promo code, user, booking..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button className="bg-blue-600 text-white px-5 rounded-r-md hover:bg-blue-700 transition-colors">
                  <FiSearch size={20} />
                </button>
              </div>

              {/* Promo Code Filter */}
              <select
                value={filterPromoCode}
                onChange={(e) => {
                  setFilterPromoCode(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700"
              >
                {promoCodes.map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>

              {/* Download Button */}
              <button
                onClick={downloadCSV}
                className="px-4 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FiDownload size={18} />
                Download CSV
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                <p className="text-sm opacity-90">Total Usage</p>
                <p className="text-3xl font-bold mt-1">{usageData.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                <p className="text-sm opacity-90">Total Discount</p>
                <p className="text-3xl font-bold mt-1">₹{totalDiscount}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                <p className="text-sm opacity-90">Avg Discount</p>
                <p className="text-3xl font-bold mt-1">₹{Math.round(avgDiscount)}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                <p className="text-sm opacity-90">Unique Codes</p>
                <p className="text-3xl font-bold mt-1">{promoCodes.length - 1}</p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Usage ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Promo Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      User Details
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Original
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Discount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Final Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Date & Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEntries.length > 0 ? (
                    currentEntries.map((usage) => (
                      <tr key={usage.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-gray-800 font-medium whitespace-nowrap">
                          {usage.usageId}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {usage.promoCode}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-gray-800 font-medium">{usage.userName}</p>
                            <p className="text-gray-500 text-xs">{usage.userEmail}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {usage.serviceName}
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          ₹{usage.originalAmount}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-green-600 font-semibold">
                            -₹{usage.discountAmount}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-800 font-semibold whitespace-nowrap">
                          ₹{usage.finalAmount}
                        </td>
                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                          <div>
                            <p>{new Date(usage.usageDate).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">{usage.usageTime}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleView(usage)}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                        No promo usage records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredUsageData.length > 0 && (
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  <span>Showing</span>
                  <span className="font-medium">{indexOfFirstEntry + 1}</span>
                  <span>to</span>
                  <span className="font-medium">
                    {Math.min(indexOfLastEntry, filteredUsageData.length)}
                  </span>
                  <span>of</span>
                  <span className="font-medium">{filteredUsageData.length}</span>
                  <span>entries</span>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="ml-2 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 flex-wrap justify-center">
                  {getPageNumbers().map((page, index) =>
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && selectedUsage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Usage Details</h2>
                  <p className="text-sm opacity-90">{selectedUsage.usageId}</p>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 transition-colors p-2 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Promo Code Info */}
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <p className="text-xs text-blue-600 font-semibold uppercase mb-2">Promo Code Used</p>
                <p className="text-2xl font-bold text-blue-700">{selectedUsage.promoCode}</p>
              </div>

              {/* User Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">User Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">User ID</p>
                    <p className="text-sm font-medium text-gray-800">{selectedUsage.userId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Name</p>
                    <p className="text-sm font-medium text-gray-800">{selectedUsage.userName}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="text-sm font-medium text-blue-600">{selectedUsage.userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Booking ID</p>
                    <p className="text-sm font-medium text-gray-800">{selectedUsage.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Service Name</p>
                    <p className="text-sm font-medium text-gray-800">{selectedUsage.serviceName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(selectedUsage.usageDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Time</p>
                    <p className="text-sm font-medium text-gray-800">{selectedUsage.usageTime}</p>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Original Amount</p>
                    <p className="text-base font-semibold text-gray-800">₹{selectedUsage.originalAmount}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Discount Applied</p>
                    <p className="text-base font-semibold text-green-600">-₹{selectedUsage.discountAmount}</p>
                  </div>
                  <div className="h-px bg-green-300"></div>
                  <div className="flex justify-between items-center">
                    <p className="text-base font-semibold text-gray-800">Final Amount</p>
                    <p className="text-xl font-bold text-green-700">₹{selectedUsage.finalAmount}</p>
                  </div>
                  <div className="bg-green-200 rounded-lg p-3 mt-2">
                    <p className="text-sm text-green-800 text-center">
                      <span className="font-semibold">Saved: </span>
                      ₹{selectedUsage.discountAmount} ({Math.round((selectedUsage.discountAmount / selectedUsage.originalAmount) * 100)}%)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-xl">
              <button
                onClick={() => setShowViewModal(false)}
                className="w-full px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
