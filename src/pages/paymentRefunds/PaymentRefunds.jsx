import React, { useState, useMemo } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { FiHome, FiSearch, FiChevronDown, FiEye, FiEdit2, FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";

// Dummy payment refunds data
const dummyRefunds = [
  {
    id: "REF001",
    bookingId: "BK4521",
    customer: "Kullanıcı 1",
    provider: "Electric",
    amount: 380.00,
    paymentMethod: "Stripe",
    status: "succeeded",
    transactionId: "pi_3SsFXql4kfuyFuCo1KQcvCFD",
    message: "Stripe Refund Processed",
    date: "2026-01-28",
    email: "customer1@example.com",
  },
  {
    id: "REF002",
    bookingId: "BK4522",
    customer: "Kullanıcı 1",
    provider: "Electric",
    amount: 130.00,
    paymentMethod: "Xendit",
    status: "Success",
    transactionId: "ddpy-3e1e07a3-944b-4cba-a4ec-c964e2c2830c",
    message: "Xendit Refund Processed",
    date: "2026-01-28",
    email: "customer1@example.com",
  },
  {
    id: "REF003",
    bookingId: "BK4523",
    customer: "Kullanıcı 1",
    provider: "Himani",
    amount: 200.00,
    paymentMethod: "RazorPay",
    status: "processed",
    transactionId: "pay_S3ihUSBdidUmRZ",
    message: "RazorPay Refund Processed",
    date: "2026-01-27",
    email: "customer1@example.com",
  },
  {
    id: "REF004",
    bookingId: "BK4524",
    customer: "Kullanıcı 1",
    provider: "Electric",
    amount: 115.00,
    paymentMethod: "RazorPay",
    status: "processed",
    transactionId: "pay_Rw958oc9nYO6FN",
    message: "RazorPay Refund Processed",
    date: "2026-01-27",
    email: "customer1@example.com",
  },
  {
    id: "REF005",
    bookingId: "BK4525",
    customer: "Kullanıcı 1",
    provider: "Asutosh",
    amount: 110.00,
    paymentMethod: "Xendit",
    status: "Success",
    transactionId: "grpy_f2866355-e5c5-4db9-8749-a97d94846840",
    message: "Xendit Refund Processed",
    date: "2026-01-26",
    email: "customer1@example.com",
  },
  {
    id: "REF006",
    bookingId: "BK4526",
    customer: "John Smith",
    provider: "Plumbing Pro",
    amount: 250.00,
    paymentMethod: "Stripe",
    status: "pending",
    transactionId: "pi_3TtGYrl5lgvzGvDp2LRdwEGE",
    message: "Pending manual processing",
    date: "2026-01-26",
    email: "john.smith@example.com",
  },
  {
    id: "REF007",
    bookingId: "BK4527",
    customer: "Sarah Johnson",
    provider: "CleanCo",
    amount: 175.50,
    paymentMethod: "RazorPay",
    status: "failed",
    transactionId: "pay_T4jiVTCejeVnSA",
    message: "Failed - Insufficient funds",
    date: "2026-01-25",
    email: "sarah.j@example.com",
  },
  {
    id: "REF008",
    bookingId: "BK4528",
    customer: "Michael Davis",
    provider: "AC Repair",
    amount: 320.00,
    paymentMethod: "Stripe",
    status: "succeeded",
    transactionId: "pi_3UuHZsm6mhwAHxEq3MSexFHF",
    message: "Stripe Refund Processed",
    date: "2026-01-25",
    email: "m.davis@example.com",
  },
  {
    id: "REF009",
    bookingId: "BK4529",
    customer: "Emma Wilson",
    provider: "Carpentry",
    amount: 195.00,
    paymentMethod: "Xendit",
    status: "Success",
    transactionId: "hsqz-4f2f18b4-a55c-5dca-b5fd-d875f3d3941d",
    message: "Xendit Refund Processed",
    date: "2026-01-24",
    email: "emma.w@example.com",
  },
  {
    id: "REF010",
    bookingId: "BK4530",
    customer: "David Brown",
    provider: "Painting",
    amount: 420.00,
    paymentMethod: "RazorPay",
    status: "processed",
    transactionId: "pay_U5kjWUDfkfWoTB",
    message: "RazorPay Refund Processed",
    date: "2026-01-24",
    email: "d.brown@example.com",
  },
  {
    id: "REF011",
    bookingId: "BK4531",
    customer: "Olivia Martinez",
    provider: "Landscaping",
    amount: 280.00,
    paymentMethod: "Stripe",
    status: "pending",
    transactionId: "pi_3VvIAtn7nixyIyFr4NTfyGIG",
    message: "Awaiting approval",
    date: "2026-01-23",
    email: "olivia.m@example.com",
  },
  {
    id: "REF012",
    bookingId: "BK4532",
    customer: "James Anderson",
    provider: "Pest Control",
    amount: 145.00,
    paymentMethod: "Xendit",
    status: "Success",
    transactionId: "itrA-5g3g29c5-b66d-6edb-c6ge-e986g4e4a52e",
    message: "Xendit Refund Processed",
    date: "2026-01-23",
    email: "j.anderson@example.com",
  },
];

export default function PaymentRefundsPage() {
  const [refunds, setRefunds] = useState(dummyRefunds);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showNotice, setShowNotice] = useState(true);

  // Search logic
  const filteredRefunds = useMemo(() => {
    let data = refunds;

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(r =>
        r.id.toLowerCase().includes(searchLower) ||
        r.bookingId.toLowerCase().includes(searchLower) ||
        r.customer.toLowerCase().includes(searchLower) ||
        r.provider.toLowerCase().includes(searchLower) ||
        r.paymentMethod.toLowerCase().includes(searchLower) ||
        r.transactionId.toLowerCase().includes(searchLower) ||
        r.status.toLowerCase().includes(searchLower) ||
        r.amount.toString().includes(searchLower)
      );
    }

    return data;
  }, [refunds, search]);

  // Pagination
  const totalPages = Math.ceil(filteredRefunds.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredRefunds.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // Generate page numbers
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

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    let styles = "";

    if (statusLower === "succeeded" || statusLower === "success" || statusLower === "processed") {
      styles = "bg-green-500 text-white";
    } else if (statusLower === "pending") {
      styles = "bg-yellow-500 text-white";
    } else if (statusLower === "failed") {
      styles = "bg-red-500 text-white";
    } else {
      styles = "bg-gray-500 text-white";
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
        {status}
      </span>
    );
  };

  // Handle operations
  const handleView = (refund) => {
    alert(`Viewing refund details:\n\nBooking ID: ${refund.bookingId}\nCustomer: ${refund.customer}\nAmount: $${refund.amount}\nStatus: ${refund.status}`);
  };

  const handleApprove = (refund) => {
    if (window.confirm(`Approve refund for ${refund.customer} ($${refund.amount})?`)) {
      const updated = refunds.map(r =>
        r.id === refund.id ? { ...r, status: "succeeded" } : r
      );
      setRefunds(updated);
      alert("Refund approved successfully!");
    }
  };

  const handleReject = (refund) => {
    if (window.confirm(`Reject refund for ${refund.customer} ($${refund.amount})?`)) {
      const updated = refunds.map(r =>
        r.id === refund.id ? { ...r, status: "failed" } : r
      );
      setRefunds(updated);
      alert("Refund rejected!");
    }
  };

  const handleEdit = (refund) => {
    alert(`Edit refund: ${refund.id}`);
  };

  // Handle download
  const handleDownload = () => {
    const csvContent = [
      ["Refund ID", "Booking ID", "Customer", "Provider", "Amount", "Payment Method", "Status", "Transaction ID", "Message", "Date"],
      ...filteredRefunds.map(r => [
        r.id,
        r.bookingId,
        r.customer,
        r.provider,
        r.amount,
        r.paymentMethod,
        r.status,
        r.transactionId,
        r.message,
        r.date
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment_refunds_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
        {/* Header with Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Payment Refunds</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Payment Refunds</span>
          </div>
        </div>

        {/* Important Notice Banner */}
        {showNotice && (
          <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 lg:p-5 mb-6 shadow-lg relative">
            <button
              onClick={() => setShowNotice(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-200 transition-colors"
            >
              <FiX size={20} />
            </button>
            <div className="flex items-start gap-3">
              <FiAlertTriangle size={24} className="shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg mb-1">⚠ Important Notice:</h3>
                <p className="text-sm leading-relaxed">
                  Only update refund status after you have completed the manual refund process through your payment gateway or financial institution. 
                  Changing the status here does not automatically process the refund.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6">
            {/* Search and Download Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Search Bar */}
              <div className="flex flex-1">
                <input
                  type="text"
                  placeholder="Search here!"
                  value={search}
                  onChange={handleSearch}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button className="bg-blue-600 text-white px-5 rounded-r-md hover:bg-blue-700 transition-colors">
                  <FiSearch size={20} />
                </button>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <span>Download</span>
                <FiChevronDown size={16} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Booking ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Provider
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Payment Method
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Transaction ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Message
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEntries.length > 0 ? (
                    currentEntries.map((refund) => (
                      <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-gray-800 font-medium whitespace-nowrap">
                          {refund.bookingId}
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {refund.customer}
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {refund.provider}
                        </td>
                        <td className="px-4 py-4 text-gray-800 font-semibold whitespace-nowrap">
                          ${refund.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {refund.paymentMethod}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getStatusBadge(refund.status)}
                        </td>
                        <td className="px-4 py-4 text-gray-600 max-w-xs truncate" title={refund.transactionId}>
                          {refund.transactionId}
                        </td>
                        <td className="px-4 py-4 text-gray-600 max-w-xs">
                          <span className="block truncate" title={refund.message}>
                            {refund.message}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(refund)}
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => handleEdit(refund)}
                              className="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            {refund.status.toLowerCase() === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(refund)}
                                  className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve Refund"
                                >
                                  <FiCheck size={18} />
                                </button>
                                <button
                                  onClick={() => handleReject(refund)}
                                  className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Reject Refund"
                                >
                                  <FiX size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                        No payment refunds found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredRefunds.length > 0 && (
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  <span>Showing</span>
                  <span className="font-medium">{indexOfFirstEntry + 1}</span>
                  <span>to</span>
                  <span className="font-medium">
                    {Math.min(indexOfLastEntry, filteredRefunds.length)}
                  </span>
                  <span>of</span>
                  <span className="font-medium">{filteredRefunds.length}</span>
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
                        onClick={() => handlePageChange(page)}
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
    </AdminLayout>
  );
}
