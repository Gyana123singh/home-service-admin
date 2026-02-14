import { useState, useMemo } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { FiHome, FiSearch, FiEdit2, FiTrash2, FiPlus, FiX, FiCopy, FiCheckCircle, FiXCircle, FiToggleLeft, FiToggleRight } from "react-icons/fi";

// Dummy Promo Codes data
const initialPromoCodes = [
  {
    id: 1,
    code: "WELCOME50",
    description: "Welcome discount for new users",
    discountType: "percentage",
    discountValue: 50,
    maxUses: 100,
    usedCount: 45,
    minOrderValue: 500,
    maxDiscountAmount: 200,
    startDate: "2026-01-01",
    expiryDate: "2026-03-31",
    status: "Active",
    userType: "New Users",
  },
  {
    id: 2,
    code: "SAVE100",
    description: "Flat Rs. 100 off on all services",
    discountType: "fixed",
    discountValue: 100,
    maxUses: 500,
    usedCount: 312,
    minOrderValue: 1000,
    maxDiscountAmount: 100,
    startDate: "2026-01-15",
    expiryDate: "2026-02-28",
    status: "Active",
    userType: "All Users",
  },
  {
    id: 3,
    code: "FIRST20",
    description: "20% off on first booking",
    discountType: "percentage",
    discountValue: 20,
    maxUses: 1000,
    usedCount: 856,
    minOrderValue: 300,
    maxDiscountAmount: 150,
    startDate: "2026-01-01",
    expiryDate: "2026-12-31",
    status: "Active",
    userType: "New Users",
  },
  {
    id: 4,
    code: "PREMIUM30",
    description: "30% off for premium members",
    discountType: "percentage",
    discountValue: 30,
    maxUses: 200,
    usedCount: 87,
    minOrderValue: 2000,
    maxDiscountAmount: 500,
    startDate: "2026-02-01",
    expiryDate: "2026-04-30",
    status: "Active",
    userType: "Premium Users",
  },
  {
    id: 5,
    code: "XMAS2025",
    description: "Christmas special discount",
    discountType: "fixed",
    discountValue: 250,
    maxUses: 300,
    usedCount: 300,
    minOrderValue: 1500,
    maxDiscountAmount: 250,
    startDate: "2025-12-20",
    expiryDate: "2025-12-31",
    status: "Expired",
    userType: "All Users",
  },
  {
    id: 6,
    code: "WINTER40",
    description: "Winter season special offer",
    discountType: "percentage",
    discountValue: 40,
    maxUses: 150,
    usedCount: 12,
    minOrderValue: 800,
    maxDiscountAmount: 300,
    startDate: "2026-01-20",
    expiryDate: "2026-02-28",
    status: "Inactive",
    userType: "All Users",
  },
];

export default function PromoCodesPage() {
  const [promoCodes, setPromoCodes] = useState(initialPromoCodes);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  
  // Form state
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    maxUses: "",
    minOrderValue: "",
    maxDiscountAmount: "",
    startDate: "",
    expiryDate: "",
    userType: "All Users",
  });
  
  const [editingId, setEditingId] = useState(null);

  // Filtering and search logic
  const filteredPromoCodes = useMemo(() => {
    let data = promoCodes;
    
    // Filter by status
    if (filterStatus !== "All") {
      data = data.filter(promo => promo.status === filterStatus);
    }
    
    // Filter by type
    if (filterType !== "All") {
      data = data.filter(promo => promo.discountType === filterType);
    }
    
    // Search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(promo =>
        promo.code.toLowerCase().includes(searchLower) ||
        promo.description.toLowerCase().includes(searchLower) ||
        promo.userType.toLowerCase().includes(searchLower)
      );
    }
    
    return data;
  }, [promoCodes, search, filterStatus, filterType]);

  // Pagination
  const totalPages = Math.ceil(filteredPromoCodes.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredPromoCodes.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add or Update Promo Code
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.code.trim() || !formData.discountValue || !formData.maxUses) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId) {
      // Update existing promo code
      setPromoCodes(promoCodes.map(promo =>
        promo.id === editingId
          ? { ...promo, ...formData, discountValue: Number(formData.discountValue), maxUses: Number(formData.maxUses), minOrderValue: Number(formData.minOrderValue) || 0, maxDiscountAmount: Number(formData.maxDiscountAmount) || 0 }
          : promo
      ));
      alert("Promo code updated successfully!");
      setEditingId(null);
    } else {
      // Add new promo code
      const newPromo = {
        id: Math.max(...promoCodes.map(p => p.id), 0) + 1,
        ...formData,
        discountValue: Number(formData.discountValue),
        maxUses: Number(formData.maxUses),
        minOrderValue: Number(formData.minOrderValue) || 0,
        maxDiscountAmount: Number(formData.maxDiscountAmount) || 0,
        usedCount: 0,
        status: "Active",
      };
      setPromoCodes([...promoCodes, newPromo]);
      alert("Promo code added successfully!");
    }

    // Reset form
    setFormData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      maxUses: "",
      minOrderValue: "",
      maxDiscountAmount: "",
      startDate: "",
      expiryDate: "",
      userType: "All Users",
    });
  };

  // Edit Promo Code
  const handleEdit = (promo) => {
    setFormData({
      code: promo.code,
      description: promo.description,
      discountType: promo.discountType,
      discountValue: promo.discountValue.toString(),
      maxUses: promo.maxUses.toString(),
      minOrderValue: promo.minOrderValue.toString(),
      maxDiscountAmount: promo.maxDiscountAmount.toString(),
      startDate: promo.startDate,
      expiryDate: promo.expiryDate,
      userType: promo.userType,
    });
    setEditingId(promo.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setFormData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      maxUses: "",
      minOrderValue: "",
      maxDiscountAmount: "",
      startDate: "",
      expiryDate: "",
      userType: "All Users",
    });
    setEditingId(null);
  };

  // Delete Promo Code
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this promo code?")) {
      setPromoCodes(promoCodes.filter(promo => promo.id !== id));
      alert("Promo code deleted successfully!");
    }
  };

  // Toggle Status
  const toggleStatus = (id) => {
    setPromoCodes(promoCodes.map(promo =>
      promo.id === id
        ? { ...promo, status: promo.status === "Active" ? "Inactive" : "Active" }
        : promo
    ));
  };

  // Copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Code "${code}" copied to clipboard!`);
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
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Promo Codes Management</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-blue-600 hover:underline transition-colors">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-yellow-600">Promo Codes</span>
          </div>
        </div>

        {/* Main Grid Layout - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN - Add/Edit Form */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editingId ? "Edit Promo Code" : "Add New Promo Code"}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Promo Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g., SAVE50"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm uppercase"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the promo code"
                    rows="3"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  />
                </div>

                {/* Discount Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>

                {/* Discount Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    placeholder={formData.discountType === "percentage" ? "e.g., 50" : "e.g., 100"}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                {/* Max Uses */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Uses <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="maxUses"
                    value={formData.maxUses}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                {/* Min Order Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Order Value (₹)
                  </label>
                  <input
                    type="number"
                    name="minOrderValue"
                    value={formData.minOrderValue}
                    onChange={handleInputChange}
                    placeholder="e.g., 500"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Max Discount Amount */}
                {formData.discountType === "percentage" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Discount Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="maxDiscountAmount"
                      value={formData.maxDiscountAmount}
                      onChange={handleInputChange}
                      placeholder="e.g., 200"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* User Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Type
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="All Users">All Users</option>
                    <option value="New Users">New Users</option>
                    <option value="Premium Users">Premium Users</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    {editingId ? (
                      <>
                        <FiEdit2 size={18} />
                        Update Code
                      </>
                    ) : (
                      <>
                        <FiPlus size={18} />
                        Add Code
                      </>
                    )}
                  </button>
                  
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                    >
                      <FiX size={18} />
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN - Promo Codes List */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-5">
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  {/* Search */}
                  <div className="flex flex-1">
                    <input
                      type="text"
                      placeholder="Search promo codes..."
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

                  {/* Status Filter */}
                  <select
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Expired">Expired</option>
                  </select>

                  {/* Type Filter */}
                  <select
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700"
                  >
                    <option value="All">All Types</option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                  </select>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                    <p className="text-sm opacity-90">Total Codes</p>
                    <p className="text-2xl font-bold mt-1">{promoCodes.length}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                    <p className="text-sm opacity-90">Active</p>
                    <p className="text-2xl font-bold mt-1">
                      {promoCodes.filter(p => p.status === "Active").length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
                    <p className="text-sm opacity-90">Inactive</p>
                    <p className="text-2xl font-bold mt-1">
                      {promoCodes.filter(p => p.status === "Inactive").length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white">
                    <p className="text-sm opacity-90">Expired</p>
                    <p className="text-2xl font-bold mt-1">
                      {promoCodes.filter(p => p.status === "Expired").length}
                    </p>
                  </div>
                </div>

                {/* Promo Codes List */}
                <div className="space-y-4">
                  {currentEntries.length > 0 ? (
                    currentEntries.map((promo) => (
                      <div
                        key={promo.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Left: Code and Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="bg-blue-50 border-2 border-blue-600 border-dashed rounded-lg px-4 py-2">
                                <span className="text-blue-600 font-bold text-lg">{promo.code}</span>
                              </div>
                              <button
                                onClick={() => copyToClipboard(promo.code)}
                                className="text-gray-500 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Copy code"
                              >
                                <FiCopy size={18} />
                              </button>
                              {promo.status === "Active" && (
                                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                  <FiCheckCircle size={14} />
                                  Active
                                </span>
                              )}
                              {promo.status === "Inactive" && (
                                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                  <FiXCircle size={14} />
                                  Inactive
                                </span>
                              )}
                              {promo.status === "Expired" && (
                                <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                  <FiXCircle size={14} />
                                  Expired
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-700 text-sm mb-3">{promo.description}</p>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                              <div>
                                <span className="font-semibold">Discount: </span>
                                <span className="text-blue-600 font-bold">
                                  {promo.discountType === "percentage" 
                                    ? `${promo.discountValue}%` 
                                    : `₹${promo.discountValue}`}
                                </span>
                              </div>
                              <div>
                                <span className="font-semibold">Min Order: </span>
                                <span>₹{promo.minOrderValue}</span>
                              </div>
                              <div>
                                <span className="font-semibold">Usage: </span>
                                <span>{promo.usedCount}/{promo.maxUses}</span>
                              </div>
                              <div>
                                <span className="font-semibold">User Type: </span>
                                <span>{promo.userType}</span>
                              </div>
                              {promo.expiryDate && (
                                <div className="col-span-2">
                                  <span className="font-semibold">Valid Until: </span>
                                  <span>{new Date(promo.expiryDate).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex md:flex-col gap-2 justify-end">
                            <button
                              onClick={() => toggleStatus(promo.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                promo.status === "Active"
                                  ? "text-green-600 hover:text-green-800 hover:bg-green-50"
                                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                              }`}
                              title="Toggle Status"
                            >
                              {promo.status === "Active" ? (
                                <FiToggleRight size={24} />
                              ) : (
                                <FiToggleLeft size={24} />
                              )}
                            </button>
                            <button
                              onClick={() => handleEdit(promo)}
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(promo.id)}
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No promo codes found</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {search ? "Try adjusting your search" : "Add your first promo code using the form"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filteredPromoCodes.length > 0 && (
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Showing</span>
                      <span className="font-medium">{indexOfFirstEntry + 1}</span>
                      <span>to</span>
                      <span className="font-medium">
                        {Math.min(indexOfLastEntry, filteredPromoCodes.length)}
                      </span>
                      <span>of</span>
                      <span className="font-medium">{filteredPromoCodes.length}</span>
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
                      </select>
                    </div>

                    <div className="flex items-center gap-1">
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
        </div>
      </div>
    </AdminLayout>
  );
}
