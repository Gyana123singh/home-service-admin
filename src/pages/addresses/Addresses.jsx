import React, { useState, useMemo } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { FiHome, FiSearch, FiChevronDown, FiEye, FiEdit2, FiTrash2, FiMapPin } from "react-icons/fi";

// Dummy addresses data
const dummyAddresses = [
  {
    id: "ADDR623",
    userName: "Frank Dan",
    userId: "USR3017",
    type: "home",
    mobile: "XXXX6519",
    displayMobile: "+1 555 987 6519",
    city: "Plymouth",
    address: "6 Emma Place Ope",
    area: "please,",
    pincode: "PL4 0JX",
    state: "Devon",
    country: "United Kingdom",
    email: "frank.dan@example.com",
    isDefault: true,
  },
  {
    id: "ADDR622",
    userName: "Anonymous Account",
    userId: "USR3142",
    type: "Other",
    mobile: "XXXX2190",
    displayMobile: "+234 802 123 2190",
    city: "Lagos",
    address: "31",
    area: "ikotih,",
    pincode: "100001",
    state: "Lagos",
    country: "Nigeria",
    email: "anonymous@example.com",
    isDefault: false,
  },
  {
    id: "ADDR621",
    userName: "nabin",
    userId: "USR3128",
    type: "home",
    mobile: "XXXX233",
    displayMobile: "+977 9841 234 233",
    city: "Chhatre Deurali",
    address: "hhb",
    area: "ggg,",
    pincode: "44600",
    state: "Bagmati",
    country: "Nepal",
    email: "nabin@example.com",
    isDefault: true,
  },
  {
    id: "ADDR620",
    userName: "Aayush Thacker",
    userId: "USR3143",
    type: "home",
    mobile: "XXXX494",
    displayMobile: "+91 9876 543 494",
    city: "Bhuj",
    address: "ysg",
    area: "hes,",
    pincode: "370001",
    state: "Gujarat",
    country: "India",
    email: "aayush.thacker@example.com",
    isDefault: true,
  },
  {
    id: "ADDR619",
    userName: "Softpro technologies",
    userId: "USR3089",
    type: "home",
    mobile: "XXXX",
    displayMobile: "+1 555 123 4567",
    city: "Newdale",
    address: "B1",
    area: "B2,",
    pincode: "83436",
    state: "Idaho",
    country: "United States",
    email: "softpro@example.com",
    isDefault: false,
  },
  {
    id: "ADDR618",
    userName: "Michael Brown",
    userId: "USR3105",
    type: "office",
    mobile: "XXXX789",
    displayMobile: "+44 7911 123 789",
    city: "London",
    address: "45 Baker Street",
    area: "Westminster,",
    pincode: "W1U 8ED",
    state: "England",
    country: "United Kingdom",
    email: "m.brown@example.com",
    isDefault: false,
  },
  {
    id: "ADDR617",
    userName: "Sarah Johnson",
    userId: "USR3098",
    type: "home",
    mobile: "XXXX456",
    displayMobile: "+1 555 876 5456",
    city: "New York",
    address: "123 Broadway Ave",
    area: "Manhattan,",
    pincode: "10001",
    state: "New York",
    country: "United States",
    email: "sarah.j@example.com",
    isDefault: true,
  },
  {
    id: "ADDR616",
    userName: "Emma Wilson",
    userId: "USR3087",
    type: "home",
    mobile: "XXXX321",
    displayMobile: "+61 4 1234 5321",
    city: "Sydney",
    address: "78 Harbour Bridge Rd",
    area: "CBD,",
    pincode: "2000",
    state: "New South Wales",
    country: "Australia",
    email: "emma.w@example.com",
    isDefault: true,
  },
  {
    id: "ADDR615",
    userName: "David Lee",
    userId: "USR3076",
    type: "office",
    mobile: "XXXX654",
    displayMobile: "+65 9123 4654",
    city: "Singapore",
    address: "22 Marina Bay",
    area: "Downtown Core,",
    pincode: "018956",
    state: "Central",
    country: "Singapore",
    email: "david.lee@example.com",
    isDefault: false,
  },
  {
    id: "ADDR614",
    userName: "Olivia Martinez",
    userId: "USR3065",
    type: "home",
    mobile: "XXXX987",
    displayMobile: "+34 612 345 987",
    city: "Barcelona",
    address: "56 La Rambla",
    area: "Gothic Quarter,",
    pincode: "08002",
    state: "Catalonia",
    country: "Spain",
    email: "olivia.m@example.com",
    isDefault: true,
  },
  {
    id: "ADDR613",
    userName: "James Anderson",
    userId: "USR3054",
    type: "Other",
    mobile: "XXXX147",
    displayMobile: "+49 30 1234 5147",
    city: "Berlin",
    address: "89 Alexanderplatz",
    area: "Mitte,",
    pincode: "10178",
    state: "Berlin",
    country: "Germany",
    email: "james.a@example.com",
    isDefault: false,
  },
  {
    id: "ADDR612",
    userName: "Sophia Taylor",
    userId: "USR3042",
    type: "home",
    mobile: "XXXX258",
    displayMobile: "+33 1 42 12 34 56",
    city: "Paris",
    address: "12 Rue de Rivoli",
    area: "1st Arrondissement,",
    pincode: "75001",
    state: "Île-de-France",
    country: "France",
    email: "sophia.t@example.com",
    isDefault: true,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(dummyAddresses);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Search logic
  const filteredAddresses = useMemo(() => {
    let data = addresses;

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(a =>
        a.id.toLowerCase().includes(searchLower) ||
        a.userName.toLowerCase().includes(searchLower) ||
        a.type.toLowerCase().includes(searchLower) ||
        a.mobile.toLowerCase().includes(searchLower) ||
        a.city.toLowerCase().includes(searchLower) ||
        a.address.toLowerCase().includes(searchLower) ||
        a.area.toLowerCase().includes(searchLower) ||
        a.pincode.toLowerCase().includes(searchLower) ||
        a.state.toLowerCase().includes(searchLower) ||
        a.country.toLowerCase().includes(searchLower)
      );
    }

    return data;
  }, [addresses, search]);

  // Pagination
  const totalPages = Math.ceil(filteredAddresses.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredAddresses.slice(indexOfFirstEntry, indexOfLastEntry);

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

  // Get type badge styling
  const getTypeBadge = (type) => {
    const typeLower = type.toLowerCase();
    let styles = "";

    if (typeLower === "home") {
      styles = "bg-blue-100 text-blue-700 border-blue-300";
    } else if (typeLower === "office") {
      styles = "bg-purple-100 text-purple-700 border-purple-300";
    } else {
      styles = "bg-gray-100 text-gray-700 border-gray-300";
    }

    return (
      <span className={`px-3 py-1 rounded-md text-xs font-medium border ${styles}`}>
        {type}
      </span>
    );
  };

  // Handle operations
  const handleView = (address) => {
    setSelectedAddress(address);
    setShowViewModal(true);
  };

  const handleEdit = (address) => {
    alert(`Edit address: ${address.id}\nUser: ${address.userName}\nCity: ${address.city}`);
  };

  const handleDelete = (address) => {
    if (window.confirm(`Are you sure you want to delete this address?\n\nUser: ${address.userName}\nCity: ${address.city}, ${address.state}`)) {
      setAddresses(addresses.filter(a => a.id !== address.id));
      alert("Address deleted successfully!");
    }
  };

  // Handle download
  const handleDownload = () => {
    const csvContent = [
      ["ID", "User Name", "Type", "Mobile", "City", "Address", "Area", "Pincode", "State", "Country", "Email"],
      ...filteredAddresses.map(a => [
        a.id,
        a.userName,
        a.type,
        a.displayMobile,
        a.city,
        a.address,
        a.area,
        a.pincode,
        a.state,
        a.country,
        a.email
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `addresses_${new Date().toISOString().split('T')[0]}.csv`;
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
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Addresses</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-blue-600 hover:underline transition-colors">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Addresses</span>
          </div>
        </div>

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
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      User Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Mobile
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      City
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Area
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Pincode
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      State
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEntries.length > 0 ? (
                    currentEntries.map((address) => (
                      <tr key={address.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-gray-700 font-medium whitespace-nowrap">
                          {address.id}
                        </td>
                        <td className="px-4 py-4 text-gray-800 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{address.userName}</span>
                            {address.isDefault && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getTypeBadge(address.type)}
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {address.mobile}
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {address.city}
                        </td>
                        <td className="px-4 py-4 text-gray-600 max-w-xs">
                          <span className="block truncate" title={address.address}>
                            {address.address}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                          {address.area}
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {address.pincode}
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {address.state}
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                          {address.country}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(address)}
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => handleEdit(address)}
                              className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit Address"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(address)}
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Address"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="px-4 py-8 text-center text-gray-500">
                        No addresses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredAddresses.length > 0 && (
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  <span>Showing</span>
                  <span className="font-medium">{indexOfFirstEntry + 1}</span>
                  <span>to</span>
                  <span className="font-medium">
                    {Math.min(indexOfLastEntry, filteredAddresses.length)}
                  </span>
                  <span>of</span>
                  <span className="font-medium">{filteredAddresses.length}</span>
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

      {/* View Address Modal */}
      {showViewModal && selectedAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FiMapPin className="text-blue-600" size={24} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Address Details
                </h2>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6 space-y-6">
              {/* User Information */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  User Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Name</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.userName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">User ID</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.userId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Mobile</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.displayMobile}</p>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiMapPin className="text-blue-600" size={20} />
                  Address Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-600 mb-1">Address Type</p>
                    <div className="flex items-center gap-2">
                      {getTypeBadge(selectedAddress.type)}
                      {selectedAddress.isDefault && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                          Default Address
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-600 mb-1">Street Address</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Area</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.area}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">City</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">State</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.state}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Pincode</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.pincode}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-600 mb-1">Country</p>
                    <p className="text-sm font-medium text-gray-800">{selectedAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Full Address Display */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2">Complete Address</p>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {selectedAddress.address}, {selectedAddress.area} {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}, {selectedAddress.country}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row gap-3 rounded-b-xl">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEdit(selectedAddress);
                }}
                className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <FiEdit2 size={18} />
                Edit Address
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
