import { useState, useMemo } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { FiHome, FiSearch, FiEdit2, FiTrash2, FiPlus, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

// Dummy FAQ data
const initialFAQs = [
  {
    id: 1,
    question: "How do I book a service?",
    answer: "To book a service, simply browse our service categories, select the service you need, choose a time slot, and confirm your booking. You can also manage your bookings from your dashboard.",
    category: "Booking",
    status: "Active",
    order: 1,
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards, net banking, UPI, and digital wallets. Payment is processed securely through our payment gateway.",
    category: "Payment",
    status: "Active",
    order: 2,
  },
  {
    id: 3,
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule your booking up to 2 hours before the scheduled time. Cancellation charges may apply based on our cancellation policy.",
    category: "Booking",
    status: "Active",
    order: 3,
  },
  {
    id: 4,
    question: "How do I become a service provider?",
    answer: "To become a service provider, click on 'Become a Provider' in the menu, fill out the registration form with your details and documents, and wait for verification. Our team will review your application within 24-48 hours.",
    category: "Provider",
    status: "Active",
    order: 4,
  },
  {
    id: 5,
    question: "Are the service providers verified?",
    answer: "Yes, all our service providers undergo a thorough verification process including background checks, skill assessments, and document verification to ensure quality and safety.",
    category: "Provider",
    status: "Active",
    order: 5,
  },
  {
    id: 6,
    question: "What if I'm not satisfied with the service?",
    answer: "If you're not satisfied with the service, please contact our support team within 24 hours of service completion. We'll review your case and provide appropriate solutions including refunds if necessary.",
    category: "Support",
    status: "Active",
    order: 6,
  },
  {
    id: 7,
    question: "How do refunds work?",
    answer: "Refunds are processed within 5-7 business days after approval. The amount will be credited back to your original payment method. For wallet payments, refunds are instant.",
    category: "Payment",
    status: "Active",
    order: 7,
  },
  {
    id: 8,
    question: "Do you provide services in my area?",
    answer: "Enter your location on our homepage to check service availability in your area. We're continuously expanding to new cities and localities.",
    category: "General",
    status: "Active",
    order: 8,
  },
];

export default function FAQsPage() {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [filterCategory, setFilterCategory] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
  });
  
  const [editingId, setEditingId] = useState(null);

  // Get unique categories
  const categories = ["All", ...new Set(faqs.map(faq => faq.category))];

  // Filtering and search logic
  const filteredFAQs = useMemo(() => {
    let data = faqs;
    
    // Filter by category
    if (filterCategory !== "All") {
      data = data.filter(faq => faq.category === filterCategory);
    }
    
    // Search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(faq =>
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower) ||
        faq.category.toLowerCase().includes(searchLower)
      );
    }
    
    return data;
  }, [faqs, search, filterCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredFAQs.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredFAQs.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add or Update FAQ
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId) {
      // Update existing FAQ
      setFaqs(faqs.map(faq =>
        faq.id === editingId
          ? { ...faq, ...formData }
          : faq
      ));
      alert("FAQ updated successfully!");
      setEditingId(null);
    } else {
      // Add new FAQ
      const newFAQ = {
        id: Math.max(...faqs.map(f => f.id), 0) + 1,
        ...formData,
        status: "Active",
        order: faqs.length + 1,
      };
      setFaqs([...faqs, newFAQ]);
      alert("FAQ added successfully!");
    }

    // Reset form
    setFormData({
      question: "",
      answer: "",
      category: "General",
    });
  };

  // Edit FAQ
  const handleEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
    });
    setEditingId(faq.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setFormData({
      question: "",
      answer: "",
      category: "General",
    });
    setEditingId(null);
  };

  // Delete FAQ
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(faqs.filter(faq => faq.id !== id));
      alert("FAQ deleted successfully!");
    }
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
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">FAQs Management</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-blue-600 hover:underline transition-colors">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-yellow-600">FAQs</span>
          </div>
        </div>

        {/* Main Grid Layout - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN - Add/Edit FAQ Form */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editingId ? "Edit FAQ" : "Add New FAQ"}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="General">General</option>
                    <option value="Booking">Booking</option>
                    <option value="Payment">Payment</option>
                    <option value="Provider">Provider</option>
                    <option value="Support">Support</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>

                {/* Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder="Enter FAQ question"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                {/* Answer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    placeholder="Enter FAQ answer"
                    rows="6"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    required
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
                        Update FAQ
                      </>
                    ) : (
                      <>
                        <FiPlus size={18} />
                        Add FAQ
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

          {/* RIGHT COLUMN - FAQ List */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-5">
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  {/* Search */}
                  <div className="flex flex-1">
                    <input
                      type="text"
                      placeholder="Search FAQs..."
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

                  {/* Category Filter */}
                  <select
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                    <p className="text-sm opacity-90">Total FAQs</p>
                    <p className="text-2xl font-bold mt-1">{faqs.length}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                    <p className="text-sm opacity-90">Active</p>
                    <p className="text-2xl font-bold mt-1">
                      {faqs.filter(f => f.status === "Active").length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                    <p className="text-sm opacity-90">Categories</p>
                    <p className="text-2xl font-bold mt-1">
                      {new Set(faqs.map(f => f.category)).size}
                    </p>
                  </div>
                </div>

                {/* FAQ List */}
                <div className="space-y-3">
                  {currentEntries.length > 0 ? (
                    currentEntries.map((faq) => (
                      <div
                        key={faq.id}
                        className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        {/* FAQ Header */}
                        <div
                          className="p-4 flex items-start justify-between gap-3 cursor-pointer"
                          onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-start gap-3">
                              <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                                {faq.category}
                              </span>
                              <button className="text-gray-500 hover:text-gray-700 mt-0.5">
                                {expandedFAQ === faq.id ? (
                                  <FiChevronUp size={20} />
                                ) : (
                                  <FiChevronDown size={20} />
                                )}
                              </button>
                            </div>
                            <h3 className="text-base font-semibold text-gray-800 mt-2">
                              {faq.question}
                            </h3>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(faq);
                              }}
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit FAQ"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(faq.id);
                              }}
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete FAQ"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {/* FAQ Answer - Expandable */}
                        {expandedFAQ === faq.id && (
                          <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed text-sm">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No FAQs found</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {search ? "Try adjusting your search" : "Add your first FAQ using the form"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filteredFAQs.length > 0 && (
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Showing</span>
                      <span className="font-medium">{indexOfFirstEntry + 1}</span>
                      <span>to</span>
                      <span className="font-medium">
                        {Math.min(indexOfLastEntry, filteredFAQs.length)}
                      </span>
                      <span>of</span>
                      <span className="font-medium">{filteredFAQs.length}</span>
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
