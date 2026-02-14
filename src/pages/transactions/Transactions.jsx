import React, { useState, useMemo } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { FiHome, FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

// Dummy transaction data
const dummyTransactions = [
  {
    id: 4305,
    userId: 3017,
    userName: "djdj apps",
    paymentMethod: "Stripe",
    transactionId: "pi_3Sus1GI4kfuyFuCo0A1Necyi",
    transactionType: "transaction",
    amount: 160,
    date: "2026-01-28",
    status: "Success",
  },
  {
    id: 4304,
    userId: 3017,
    userName: "djdj apps",
    paymentMethod: "Stripe",
    transactionId: "pi_3SupnsI4kfuyFuCo0emZQ9Tg",
    transactionType: "transaction",
    amount: 63.64,
    date: "2026-01-28",
    status: "Success",
  },
  {
    id: 4303,
    userId: 3143,
    userName: "Aayush Thacker",
    paymentMethod: "Xendit",
    transactionId: "ewc_5f05f320-67d0-408a-a759-b028fdb42721",
    transactionType: "transaction",
    amount: 90,
    date: "2026-01-27",
    status: "Success",
  },
  {
    id: 4302,
    userId: 3143,
    userName: "Aayush Thacker",
    paymentMethod: "Stripe",
    transactionId: "",
    transactionType: "transaction",
    amount: 90,
    date: "2026-01-27",
    status: "Success",
  },
  {
    id: 4301,
    userId: 3154,
    userName: "mere",
    paymentMethod: "Stripe",
    transactionId: "pi_3Sub1ZI4kfuyFuCo1KFqsgUa",
    transactionType: "transaction",
    amount: 1299,
    date: "2026-01-26",
    status: "Success",
  },
  {
    id: 4300,
    userId: 3142,
    userName: "John Smith",
    paymentMethod: "Stripe",
    transactionId: "pi_3Sub2ZI4kfuyFuCo2LGrthVb",
    transactionType: "transaction",
    amount: 450,
    date: "2026-01-26",
    status: "Success",
  },
  {
    id: 4299,
    userId: 3128,
    userName: "Sarah Johnson",
    paymentMethod: "Xendit",
    transactionId: "ewc_6g16g431-78e1-519b-b860-c139gec53832",
    transactionType: "transaction",
    amount: 275.50,
    date: "2026-01-25",
    status: "Success",
  },
  {
    id: 4298,
    userId: 3117,
    userName: "Michael Davis",
    paymentMethod: "Stripe",
    transactionId: "pi_3Sub3ZI4kfuyFuCo3MHsujWc",
    transactionType: "transaction",
    amount: 125,
    date: "2026-01-25",
    status: "Pending",
  },
  {
    id: 4297,
    userId: 3105,
    userName: "Emma Wilson",
    paymentMethod: "Stripe",
    transactionId: "pi_3Sub4ZI4kfuyFuCo4NItvkXd",
    transactionType: "transaction",
    amount: 890,
    date: "2026-01-24",
    status: "Success",
  },
  {
    id: 4296,
    userId: 3098,
    userName: "David Brown",
    paymentMethod: "Xendit",
    transactionId: "ewc_7h27h542-89f2-620c-c971-d240hfd64943",
    transactionType: "transaction",
    amount: 340,
    date: "2026-01-24",
    status: "Success",
  },
  {
    id: 4295,
    userId: 3089,
    userName: "Olivia Martinez",
    paymentMethod: "Stripe",
    transactionId: "pi_3Sub5ZI4kfuyFuCo5OJuwlYe",
    transactionType: "transaction",
    amount: 520,
    date: "2026-01-23",
    status: "Failed",
  },
  {
    id: 4294,
    userId: 3076,
    userName: "James Anderson",
    paymentMethod: "Stripe",
    transactionId: "pi_3Sub6ZI4kfuyFuCo6PKvxmZf",
    transactionType: "transaction",
    amount: 195,
    date: "2026-01-23",
    status: "Success",
  },
  {
    id: 4293,
    userId: 3065,
    userName: "Sophia Taylor",
    paymentMethod: "Xendit",
    transactionId: "ewc_8i38i653-90g3-731d-d082-e351ige75054",
    transactionType: "transaction",
    amount: 760,
    date: "2026-01-22",
    status: "Success",
  },
  {
    id: 4292,
    userId: 3054,
    userName: "William Thomas",
    paymentMethod: "Stripe",
    transactionId: "pi_3Sub7ZI4kfuyFuCo7QLwynAg",
    transactionType: "transaction",
    amount: 410,
    date: "2026-01-22",
    status: "Success",
  },
  {
    id: 4291,
    userId: 3042,
    userName: "Isabella White",
    paymentMethod: "Stripe",
    transactionId: "pi_3Sub8ZI4kfuyFuCo8RMxzoBh",
    transactionType: "transaction",
    amount: 880,
    date: "2026-01-21",
    status: "Success",
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(dummyTransactions);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    paymentMethod: "all",
    status: "all",
    dateRange: "all",
  });

  // Search and filter logic
  const filteredTransactions = useMemo(() => {
    let data = transactions;

    // Search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(t =>
        t.id.toString().includes(searchLower) ||
        t.userId.toString().includes(searchLower) ||
        t.userName.toLowerCase().includes(searchLower) ||
        t.paymentMethod.toLowerCase().includes(searchLower) ||
        t.transactionId.toLowerCase().includes(searchLower) ||
        t.amount.toString().includes(searchLower)
      );
    }

    // Filter by payment method
    if (filters.paymentMethod !== "all") {
      data = data.filter(t => t.paymentMethod === filters.paymentMethod);
    }

    // Filter by status
    if (filters.status !== "all") {
      data = data.filter(t => t.status === filters.status);
    }

    return data;
  }, [transactions, search, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredTransactions.slice(indexOfFirstEntry, indexOfLastEntry);

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

  // Handle download
  const handleDownload = () => {
    const csvContent = [
      ["ID", "User ID", "User Name", "Payment Method", "Transaction ID", "Transaction Type", "Amount", "Date", "Status"],
      ...filteredTransactions.map(t => [
        t.id,
        t.userId,
        t.userName,
        t.paymentMethod,
        t.transactionId,
        t.transactionType,
        t.amount,
        t.date,
        t.status
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
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
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Transactions</h1>
          <div className="flex items-center gap-2 text-sm">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Transactions</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6">
            {/* Search and Action Bar */}
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

              {/* Filter Button */}
              <button
                onClick={() => setShowFilterModal(!showFilterModal)}
                className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <FiFilter size={18} />
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <span>Download</span>
                <FiChevronDown size={16} />
              </button>
            </div>

            {/* Filter Modal */}
            {showFilterModal && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={filters.paymentMethod}
                      onChange={(e) => {
                        setFilters({ ...filters, paymentMethod: e.target.value });
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Methods</option>
                      <option value="Stripe">Stripe</option>
                      <option value="Xendit">Xendit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => {
                        setFilters({ ...filters, status: e.target.value });
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="Success">Success</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setFilters({ paymentMethod: "all", status: "all", dateRange: "all" });
                        setCurrentPage(1);
                      }}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User id
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transaction Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEntries.length > 0 ? (
                    currentEntries.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-gray-800 font-medium">
                          {transaction.id}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {transaction.userId}
                        </td>
                        <td className="px-4 py-4 text-gray-800">
                          {transaction.userName}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {transaction.paymentMethod}
                        </td>
                        <td className="px-4 py-4 text-gray-600 max-w-xs truncate" title={transaction.transactionId}>
                          {transaction.transactionId || "-"}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {transaction.transactionType}
                        </td>
                        <td className="px-4 py-4 text-gray-800 font-medium">
                          {transaction.amount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredTransactions.length > 0 && (
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  <span>Showing</span>
                  <span className="font-medium">{indexOfFirstEntry + 1}</span>
                  <span>to</span>
                  <span className="font-medium">
                    {Math.min(indexOfLastEntry, filteredTransactions.length)}
                  </span>
                  <span>of</span>
                  <span className="font-medium">{filteredTransactions.length}</span>
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
