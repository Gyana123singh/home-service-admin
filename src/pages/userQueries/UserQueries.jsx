import React, { useState, useMemo } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { FiHome, FiSearch, FiFilter, FiChevronDown, FiEye, FiTrash2, FiMail, FiFileText } from "react-icons/fi";

// Dummy user queries data
const dummyQueries = [
  {
    id: 38,
    name: "James",
    email: "James@gmail.com",
    message: "I wish to test this",
    subject: "Testing",
    date: "2026-01-28",
    status: "unread",
    phone: "+1 555-0123",
  },
  {
    id: 37,
    name: "test",
    email: "test@gmail.com",
    message: "test",
    subject: "test",
    date: "2026-01-27",
    status: "read",
    phone: "+1 555-0124",
  },
  {
    id: 36,
    name: "teat",
    email: "test@gmail.com",
    message: "test",
    subject: "test",
    date: "2026-01-27",
    status: "unread",
    phone: "+1 555-0125",
  },
  {
    id: 35,
    name: "MAULESH DUTT",
    email: "mauleshdutt01@gmail.com",
    message: "HELLO",
    subject: "HELLO",
    date: "2026-01-26",
    status: "read",
    phone: "+91 9876543210",
  },
  {
    id: 34,
    name: "MAULESH DUTT",
    email: "mauleshdutt01@gmail.com",
    message: "Car Service",
    subject: "Service",
    date: "2026-01-26",
    status: "unread",
    phone: "+91 9876543210",
  },
  {
    id: 33,
    name: "yash WRTeam",
    email: "yashwrteam89@gmail.com",
    message: "tets",
    subject: "Website Setup Done",
    date: "2026-01-25",
    status: "read",
    phone: "+91 9988776655",
  },
  {
    id: 32,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    message: "I need help with booking cancellation",
    subject: "Booking Issue",
    date: "2026-01-25",
    status: "unread",
    phone: "+44 7911 123456",
  },
  {
    id: 31,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    message: "How do I become a service provider?",
    subject: "Provider Registration",
    date: "2026-01-24",
    status: "read",
    phone: "+65 9123 4567",
  },
  {
    id: 30,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    message: "Payment not reflected in my account",
    subject: "Payment Issue",
    date: "2026-01-24",
    status: "unread",
    phone: "+61 412 345 678",
  },
  {
    id: 29,
    name: "David Brown",
    email: "d.brown@example.com",
    message: "Can you add more services in my area?",
    subject: "Service Request",
    date: "2026-01-23",
    status: "read",
    phone: "+1 555-0126",
  },
  {
    id: 28,
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    message: "The service provider was excellent!",
    subject: "Feedback",
    date: "2026-01-23",
    status: "read",
    phone: "+34 612 345 678",
  },
  {
    id: 27,
    name: "James Anderson",
    email: "j.anderson@example.com",
    message: "Having trouble with login",
    subject: "Technical Support",
    date: "2026-01-22",
    status: "unread",
    phone: "+49 30 1234 5678",
  },
];

export default function UserQueriesPage() {
  const [queries, setQueries] = useState(dummyQueries);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
    sortBy: "newest",
  });

  // Search and filter logic
  const filteredQueries = useMemo(() => {
    let data = queries;

    // Search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(q =>
        q.id.toString().includes(searchLower) ||
        q.name.toLowerCase().includes(searchLower) ||
        q.email.toLowerCase().includes(searchLower) ||
        q.message.toLowerCase().includes(searchLower) ||
        q.subject.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (filters.status !== "all") {
      data = data.filter(q => q.status === filters.status);
    }

    // Sort
    if (filters.sortBy === "newest") {
      data = [...data].sort((a, b) => b.id - a.id);
    } else if (filters.sortBy === "oldest") {
      data = [...data].sort((a, b) => a.id - b.id);
    }

    return data;
  }, [queries, search, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredQueries.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredQueries.slice(indexOfFirstEntry, indexOfLastEntry);

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

  // Handle operations
  const handleView = (query) => {
    setSelectedQuery(query);
    setShowViewModal(true);
    
    // Mark as read
    const updated = queries.map(q =>
      q.id === query.id ? { ...q, status: "read" } : q
    );
    setQueries(updated);
  };

  const handleDelete = (query) => {
    if (window.confirm(`Are you sure you want to delete this query from ${query.name}?`)) {
      setQueries(queries.filter(q => q.id !== query.id));
      alert("Query deleted successfully!");
    }
  };

  // Download functions
  const downloadCSV = () => {
    const csvContent = [
      ["ID", "Name", "Email", "Subject", "Message", "Date", "Status", "Phone"],
      ...filteredQueries.map(q => [
        q.id,
        q.name,
        q.email,
        q.subject,
        q.message,
        q.date,
        q.status,
        q.phone
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `user_queries_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    setShowDownloadMenu(false);
  };

  const downloadExcel = () => {
    // Excel format (simple HTML table that Excel can open)
    const excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
          <meta charset="utf-8">
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f3f4f6; font-weight: bold; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              ${filteredQueries.map(q => `
                <tr>
                  <td>${q.id}</td>
                  <td>${q.name}</td>
                  <td>${q.email}</td>
                  <td>${q.subject}</td>
                  <td>${q.message}</td>
                  <td>${q.date}</td>
                  <td>${q.status}</td>
                  <td>${q.phone}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `user_queries_${new Date().toISOString().split('T')[0]}.xls`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    setShowDownloadMenu(false);
  };

  const downloadPDF = () => {
    // Create a printable version
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>User Queries Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f2937; margin-bottom: 20px; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 12px; }
            th { background-color: #f3f4f6; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9fafb; }
            .header { margin-bottom: 20px; }
            .date { color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>User Queries Report</h1>
            <p class="date">Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Total Queries: ${filteredQueries.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredQueries.map(q => `
                <tr>
                  <td>${q.id}</td>
                  <td>${q.name}</td>
                  <td>${q.email}</td>
                  <td>${q.subject}</td>
                  <td>${q.message}</td>
                  <td>${q.date}</td>
                  <td>${q.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    setShowDownloadMenu(false);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
        {/* Header with Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">User Queries</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-blue-600 hover:underline transition-colors">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-yellow-600 flex items-center gap-1">
              <FiFileText size={16} />
              Customer Queries
            </span>
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

              {/* Download Button with Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium w-full sm:w-auto justify-center"
                >
                  <span>Download</span>
                  <FiChevronDown size={16} />
                </button>
                
                {/* Download Dropdown Menu */}
                {showDownloadMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={downloadPDF}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" />
                        </svg>
                        <span>Download as PDF</span>
                      </button>
                      <button
                        onClick={downloadExcel}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                        </svg>
                        <span>Download as Excel</span>
                      </button>
                      <button
                        onClick={downloadCSV}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0017.414 6L14 2.586A2 2 0 0012.586 2H8z" />
                        </svg>
                        <span>Download as CSV</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Filter Panel */}
            {showFilterModal && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      <option value="read">Read</option>
                      <option value="unread">Unread</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => {
                        setFilters({ ...filters, sortBy: e.target.value });
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setFilters({ status: "all", dateRange: "all", sortBy: "newest" });
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                <p className="text-sm opacity-90">Total Queries</p>
                <p className="text-3xl font-bold mt-1">{queries.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                <p className="text-sm opacity-90">Read</p>
                <p className="text-3xl font-bold mt-1">
                  {queries.filter(q => q.status === "read").length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
                <p className="text-sm opacity-90">Unread</p>
                <p className="text-3xl font-bold mt-1">
                  {queries.filter(q => q.status === "unread").length}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Message
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEntries.length > 0 ? (
                    currentEntries.map((query) => (
                      <tr 
                        key={query.id} 
                        className={`hover:bg-gray-50 transition-colors ${
                          query.status === "unread" ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-4 py-4 text-gray-800 font-medium whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {query.id}
                            {query.status === "unread" && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-800 whitespace-nowrap">
                          {query.name}
                        </td>
                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                          {query.email}
                        </td>
                        <td className="px-4 py-4 text-gray-700 max-w-xs">
                          <span className="block truncate" title={query.message}>
                            {query.message}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {query.subject}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(query)}
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Query"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => window.location.href = `mailto:${query.email}`}
                              className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                              title="Reply via Email"
                            >
                              <FiMail size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(query)}
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Query"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        No user queries found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredQueries.length > 0 && (
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  <span>Showing</span>
                  <span className="font-medium">{indexOfFirstEntry + 1}</span>
                  <span>to</span>
                  <span className="font-medium">
                    {Math.min(indexOfLastEntry, filteredQueries.length)}
                  </span>
                  <span>of</span>
                  <span className="font-medium">{filteredQueries.length}</span>
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

      {/* View Query Modal */}
      {showViewModal && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                    <FiFileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold">Query Details</h2>
                    <p className="text-sm opacity-90">ID: {selectedQuery.id}</p>
                  </div>
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
              {/* User Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Name</p>
                    <p className="text-sm font-medium text-gray-800">{selectedQuery.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="text-sm font-medium text-blue-600">{selectedQuery.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Phone</p>
                    <p className="text-sm font-medium text-gray-800">{selectedQuery.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(selectedQuery.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Query Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Query Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Subject</p>
                    <p className="text-base font-medium text-gray-800">{selectedQuery.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Message</p>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {selectedQuery.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex flex-col sm:flex-row gap-3 rounded-b-xl">
              <button
                onClick={() => {
                  window.location.href = `mailto:${selectedQuery.email}?subject=Re: ${selectedQuery.subject}`;
                }}
                className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <FiMail size={18} />
                Reply via Email
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
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
