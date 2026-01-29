import React, { useState, useMemo } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { FiHome, FiSearch, FiDownload, FiChevronDown, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

// Dummy customer data
const dummyCustomers = [
  {
    id: "CUST001",
    username: "jit806",
    firstName: "Jit",
    lastName: "Kumar",
    email: "wrteam.ishra58@gmail.com",
    mobile: "XXXX641",
    displayMobile: "+91 9876541234",
    avatar: "J",
    avatarColor: "#c41e3a",
    status: "Active",
    joinDate: "2025-01-15",
    totalOrders: 12,
    totalSpent: 4500,
  },
  {
    id: "CUST002",
    username: "Frank Dan",
    firstName: "Frank",
    lastName: "Dan",
    email: "wrteam.10011@gmail.com",
    mobile: "XXXX6519",
    displayMobile: "+91 9876546519",
    avatar: "F",
    avatarColor: "#4db8a8",
    status: "Active",
    joinDate: "2025-01-10",
    totalOrders: 8,
    totalSpent: 3200,
  },
  {
    id: "CUST003",
    username: "Bokhodir BADALOV",
    firstName: "Bokhodir",
    lastName: "BADALOV",
    email: "wrteam.d26@privaterelay.appleid.com",
    mobile: "XXXX76",
    displayMobile: "+1 555 234 5676",
    avatar: "B",
    avatarColor: "#5fa876",
    status: "Active",
    joinDate: "2025-01-08",
    totalOrders: 5,
    totalSpent: 2100,
  },
  {
    id: "CUST004",
    username: "Bokhodir BADALOV",
    firstName: "Bokhodir",
    lastName: "BADALOV",
    email: "wrteam.rbadalov@gmail.com",
    mobile: "XXXX959",
    displayMobile: "+1 555 876 5959",
    avatar: "B",
    avatarColor: "#7cb342",
    status: "Active",
    joinDate: "2025-01-05",
    totalOrders: 15,
    totalSpent: 5600,
  },
  {
    id: "CUST005",
    username: "Khadim Gueye",
    firstName: "Khadim",
    lastName: "Gueye",
    email: "wrteam.il24@gmail.com",
    mobile: "XXXX92",
    displayMobile: "+221 7654321092",
    avatar: "K",
    avatarColor: "#76ff03",
    status: "Active",
    joinDate: "2024-12-28",
    totalOrders: 22,
    totalSpent: 7800,
  },
  {
    id: "CUST006",
    username: "Rashid Ahmed",
    firstName: "Rashid",
    lastName: "Ahmed",
    email: "rashid.ahmed@gmail.com",
    mobile: "XXXX345",
    displayMobile: "+966 5123456789",
    avatar: "R",
    avatarColor: "#ff6f00",
    status: "Inactive",
    joinDate: "2024-12-20",
    totalOrders: 3,
    totalSpent: 1200,
  },
  {
    id: "CUST007",
    username: "Sarah Wilson",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@gmail.com",
    mobile: "XXXX456",
    displayMobile: "+1 555 654 3456",
    avatar: "S",
    avatarColor: "#e91e63",
    status: "Active",
    joinDate: "2024-12-15",
    totalOrders: 18,
    totalSpent: 6200,
  },
  {
    id: "CUST008",
    username: "Michael Brown",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@gmail.com",
    mobile: "XXXX567",
    displayMobile: "+1 555 765 4567",
    avatar: "M",
    avatarColor: "#2196f3",
    status: "Active",
    joinDate: "2024-12-10",
    totalOrders: 9,
    totalSpent: 3900,
  },
  {
    id: "CUST009",
    username: "Emma Davis",
    firstName: "Emma",
    lastName: "Davis",
    email: "emma.davis@gmail.com",
    mobile: "XXXX678",
    displayMobile: "+44 7911 987654",
    avatar: "E",
    avatarColor: "#ff5722",
    status: "Active",
    joinDate: "2024-12-05",
    totalOrders: 14,
    totalSpent: 5100,
  },
  {
    id: "CUST010",
    username: "John Martinez",
    firstName: "John",
    lastName: "Martinez",
    email: "john.martinez@gmail.com",
    mobile: "XXXX789",
    displayMobile: "+34 912 345 678",
    avatar: "J",
    avatarColor: "#009688",
    status: "Inactive",
    joinDate: "2024-11-30",
    totalOrders: 2,
    totalSpent: 800,
  },
  {
    id: "CUST011",
    username: "Lisa Chen",
    firstName: "Lisa",
    lastName: "Chen",
    email: "lisa.chen@gmail.com",
    mobile: "XXXX890",
    displayMobile: "+86 10 1234 5678",
    avatar: "L",
    avatarColor: "#673ab7",
    status: "Active",
    joinDate: "2024-11-25",
    totalOrders: 11,
    totalSpent: 4200,
  },
  {
    id: "CUST012",
    username: "David Kim",
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@gmail.com",
    mobile: "XXXX901",
    displayMobile: "+82 2 123 4567",
    avatar: "D",
    avatarColor: "#ffc107",
    status: "Active",
    joinDate: "2024-11-20",
    totalOrders: 7,
    totalSpent: 2800,
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(dummyCustomers);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter logic
  const filteredCustomers = useMemo(() => {
    let data = customers;

    // Filter by status
    if (filter === "Active") {
      data = data.filter(c => c.status === "Active");
    } else if (filter === "Deactive") {
      data = data.filter(c => c.status === "Inactive");
    }

    // Search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(c =>
        c.username.toLowerCase().includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower) ||
        c.mobile.toLowerCase().includes(searchLower) ||
        c.firstName.toLowerCase().includes(searchLower) ||
        c.lastName.toLowerCase().includes(searchLower)
      );
    }

    return data;
  }, [customers, filter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredCustomers.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

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

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(c => c.id !== id));
      alert("Customer deleted successfully!");
    }
  };

  // Handle download
  const handleDownload = () => {
    const csvContent = [
      ["ID", "Username", "Email", "Mobile", "Status", "Total Orders", "Total Spent"],
      ...filteredCustomers.map(c => [
        c.id,
        c.username,
        c.email,
        c.displayMobile,
        c.status,
        c.totalOrders,
        `$${c.totalSpent}`
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
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
          <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
          <div className="flex items-center gap-2 text-sm">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Customers</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6">
            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 mb-6 items-start lg:items-center">
              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleFilterChange("All")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === "All"
                      ? "bg-cyan-500 text-white border-2 border-cyan-500"
                      : "bg-white text-gray-700 border-2 border-cyan-300 hover:bg-cyan-50"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterChange("Active")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === "Active"
                      ? "bg-green-500 text-white border-2 border-green-500"
                      : "bg-white text-gray-700 border-2 border-green-300 hover:bg-green-50"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => handleFilterChange("Deactive")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === "Deactive"
                      ? "bg-red-500 text-white border-2 border-red-500"
                      : "bg-white text-gray-700 border-2 border-red-300 hover:bg-red-50"
                  }`}
                >
                  Deactive
                </button>
              </div>

              {/* Search and Actions */}
              <div className="flex gap-2 w-full lg:w-auto lg:ml-auto flex-col sm:flex-row">
                <div className="flex flex-1 sm:flex-initial">
                  <input
                    type="text"
                    placeholder="Search here!"
                    value={search}
                    onChange={handleSearch}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition-colors">
                    <FiSearch size={18} />
                  </button>
                </div>
                <button
                  onClick={handleDownload}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <FiDownload size={16} />
                  <span>Download</span>
                  <FiChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Profile
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEntries.length > 0 ? (
                    currentEntries.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                        {/* Profile Column */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                              style={{ backgroundColor: customer.avatarColor }}
                            >
                              {customer.avatar}
                            </div>
                            <div className="min-w-0">
                              <p className="text-blue-600 font-medium hover:underline cursor-pointer truncate">
                                {customer.username}
                              </p>
                              <p className="text-gray-500 text-xs truncate">
                                {customer.email} - {customer.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* User Name Column */}
                        <td className="px-4 py-3">
                          <span className="text-gray-800 font-medium">
                            {customer.firstName} {customer.lastName}
                          </span>
                        </td>

                        {/* Mobile Column */}
                        <td className="px-4 py-3">
                          <span className="text-gray-600">{customer.mobile}</span>
                        </td>

                        {/* Email Column */}
                        <td className="px-4 py-3">
                          <span className="text-gray-600">{customer.email}</span>
                        </td>

                        {/* Status Column */}
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-md text-xs font-medium inline-block ${
                              customer.status === "Active"
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-gray-100 text-gray-700 border border-gray-300"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>

                        {/* Actions Column */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded transition-colors"
                              title="View"
                            >
                              <FiEye size={16} />
                            </button>
                            <button
                              className="text-green-600 hover:text-green-800 p-1.5 hover:bg-green-50 rounded transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(customer.id)}
                              className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredCustomers.length > 0 && (
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  <span>Showing</span>
                  <span className="font-medium">{indexOfFirstEntry + 1}</span>
                  <span>to</span>
                  <span className="font-medium">
                    {Math.min(indexOfLastEntry, filteredCustomers.length)}
                  </span>
                  <span>of</span>
                  <span className="font-medium">{filteredCustomers.length}</span>
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

                <div className="flex items-center gap-1 flex-wrap">
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
