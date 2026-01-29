import { useState, useMemo } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { FiHome, FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

// Dummy data
const initialItems = [
  {
    id: 1,
    title: "Laundry & Cleaning Services",
    description: "Fresh, Spotless, and Hassle-Free—We Do the Dirty Work for You!",
    sectionType: "Categories",
    status: "Active",
  },
  {
    id: 2,
    title: "",
    description: "Become Provider",
    sectionType: "banner",
    status: "Active",
  },
  {
    id: 3,
    title: "Elite Providers",
    description: "Top-Rated Experts Delivering Premium Services Just for You!",
    sectionType: "Top Rated Provider",
    status: "Active",
  },
  {
    id: 4,
    title: "Home Repair Services",
    description: "Quick, reliable, and professional home repair solutions",
    sectionType: "Categories",
    status: "Active",
  },
  {
    id: 5,
    title: "Special Offer",
    description: "Get 20% off on your first booking!",
    sectionType: "banner",
    status: "Deactive",
  },
  {
    id: 6,
    title: "Premium Services",
    description: "Luxury services delivered by certified professionals",
    sectionType: "Top Rated Provider",
    status: "Active",
  },
  {
    id: 7,
    title: "Plumbing Services",
    description: "Expert plumbers available 24/7 for all your needs",
    sectionType: "Categories",
    status: "Active",
  },
  {
    id: 8,
    title: "Join as Provider",
    description: "Start earning by providing services in your area",
    sectionType: "banner",
    status: "Deactive",
  },
];

export default function FeaturedSectionPage() {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState("English(Default)");
  const [isActive, setIsActive] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    sectionType: "",
    title: "",
    description: "",
  });

  // Filtering logic
  const filteredItems = useMemo(() => {
    let data = items;
    
    // Filter by status
    if (filter === "Active") {
      data = data.filter(item => item.status === "Active");
    } else if (filter === "Deactive") {
      data = data.filter(item => item.status === "Deactive");
    }
    
    // Filter by search
    if (search.trim()) {
      data = data.filter(item =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.sectionType?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return data;
  }, [items, filter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredItems.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.sectionType || !formData.title || !formData.description) {
      alert("Please fill all required fields");
      return;
    }
    
    const newItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      title: formData.title,
      description: formData.description,
      sectionType: formData.sectionType,
      status: isActive ? "Active" : "Deactive",
    };
    
    setItems([newItem, ...items]);
    
    // Reset form
    setFormData({
      sectionType: "",
      title: "",
      description: "",
    });
    setIsActive(true);
    
    alert("Featured section added successfully!");
  };

  // Handle page change
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // Generate page numbers with ellipsis
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
          <h1 className="text-2xl font-semibold text-gray-800">Featured Section</h1>
          <div className="flex items-center gap-2 text-sm">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Featured Section</span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Add Featured Section Form */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header with Toggle */}
              <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Add Featured Section</h2>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors ${
                      isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      <div className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform ${
                        isActive ? 'transform translate-x-7' : ''
                      }`}></div>
                    </div>
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </label>
              </div>

              <form onSubmit={handleSubmit} className="p-5">
                {/* Language Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-200">
                  {["English(Default)", "Hindi", "Arabic"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 px-1 font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Section Type */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.sectionType}
                    onChange={(e) => setFormData({ ...formData, sectionType: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                  >
                    <option value="">Section Type</option>
                    <option value="Categories">Categories</option>
                    <option value="banner">Banner</option>
                    <option value="Top Rated Provider">Top Rated Provider</option>
                    <option value="Services">Services</option>
                    <option value="Offers">Offers</option>
                  </select>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter Title"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter Description"
                    rows="4"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Add Featured Section
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - All Featured List */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">All Featured</h2>
              </div>

              <div className="p-5">
                {/* Filter and Search Bar */}
                <div className="flex flex-col lg:flex-row gap-3 mb-5">
                  {/* Filter Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setFilter("All");
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        filter === "All"
                          ? "bg-cyan-500 text-white border-2 border-cyan-500"
                          : "bg-white text-gray-700 border-2 border-cyan-400 hover:bg-cyan-50"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setFilter("Active");
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        filter === "Active"
                          ? "bg-green-500 text-white border-2 border-green-500"
                          : "bg-white text-gray-700 border-2 border-green-400 hover:bg-green-50"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => {
                        setFilter("Deactive");
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        filter === "Deactive"
                          ? "bg-red-500 text-white border-2 border-red-500"
                          : "bg-white text-gray-700 border-2 border-red-400 hover:bg-red-50"
                      }`}
                    >
                      Deactive
                    </button>
                  </div>

                  {/* Search and Actions */}
                  <div className="flex gap-2 lg:ml-auto">
                    <div className="flex flex-1 lg:flex-initial">
                      <input
                        type="text"
                        placeholder="Search here!"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="flex-1 lg:w-64 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition-colors">
                        <FiSearch size={18} />
                      </button>
                    </div>
                    <button className="border border-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-50 transition-colors">
                      <FiFilter size={18} />
                    </button>
                  </div>
                </div>

                {/* Download Button */}
                <div className="mb-4">
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                    Download
                    <FiChevronDown size={16} />
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Section Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentEntries.length > 0 ? (
                        currentEntries.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-gray-800">
                              {item.title || "-"}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {item.description}
                            </td>
                            <td className="px-4 py-3 text-gray-800">
                              {item.sectionType}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-md text-xs font-medium inline-block ${
                                item.status === "Active"
                                  ? "bg-green-100 text-green-700 border border-green-300"
                                  : "bg-gray-100 text-gray-700 border border-gray-300"
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                            No featured sections found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredItems.length > 0 && (
                  <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Showing</span>
                      <span className="font-medium">{indexOfFirstEntry + 1}</span>
                      <span>to</span>
                      <span className="font-medium">
                        {Math.min(indexOfLastEntry, filteredItems.length)}
                      </span>
                      <span>of</span>
                      <span className="font-medium">{filteredItems.length}</span>
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

                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
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
                      ))}
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
