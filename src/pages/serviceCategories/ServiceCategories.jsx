import React, { useState, useRef } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { 
  FiSearch, FiFilter, FiDownload, FiMoreVertical, FiHome 
} from "react-icons/fi";

// Dummy data for categories
const dummyCategories = [
  {
    id: 277,
    name: "Veterinary Services",
    slug: "veterinary-services",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=100&h=100&fit=crop",
  },
  {
    id: 276,
    name: "Pet Training",
    slug: "pet-training",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=100&h=100&fit=crop",
  },
  {
    id: 275,
    name: "Pet Grooming",
    slug: "pet-grooming",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=100&h=100&fit=crop",
  },
  {
    id: 274,
    name: "Dog Walking",
    slug: "dog-walking",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&h=100&fit=crop",
  },
  {
    id: 273,
    name: "Pet Care",
    slug: "pet-care",
    image: "https://via.placeholder.com/100/10b981/ffffff?text=🐾",
  },
  {
    id: 272,
    name: "Wardrobe Cupboard",
    slug: "wardrobe-cupboard",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=100&h=100&fit=crop",
  },
  {
    id: 271,
    name: "Kitchen Cabinets",
    slug: "kitchen-cabinets",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=100&h=100&fit=crop",
  },
  {
    id: 270,
    name: "Carpenter Services",
    slug: "carpenter-services",
    image: "https://via.placeholder.com/100/3b82f6/ffffff?text=🔨",
  },
  {
    id: 269,
    name: "Shave/Trim",
    slug: "shave/trim",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=100&h=100&fit=crop",
  },
  {
    id: 268,
    name: "Hair color",
    slug: "hair-color",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop",
  },
];

export default function ServiceCategoriesPage() {
  const [categories, setCategories] = useState(dummyCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("English(Default)");
  const [draggedFile, setDraggedFile] = useState(null);
  const [draggedFileSEO, setDraggedFileSEO] = useState(null);
  const fileInputRef = useRef(null);
  const fileInputRefSEO = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "Category",
    darkColor: "#000000",
    lightColor: "#ffffff",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    schemaMarkup: "",
  });

  // Handle search
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.id.toString().includes(searchTerm)
  );

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredCategories.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredCategories.length / entriesPerPage);

  // Handle file drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, section) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      if (section === 'image') {
        setDraggedFile(files[0]);
      } else if (section === 'seo') {
        setDraggedFileSEO(files[0]);
      }
    }
  };

  const handleFileSelect = (e, section) => {
    const files = e.target.files;
    if (files && files[0]) {
      if (section === 'image') {
        setDraggedFile(files[0]);
      } else if (section === 'seo') {
        setDraggedFileSEO(files[0]);
      }
    }
  };

  const handleBrowseClick = (section) => {
    if (section === 'image') {
      fileInputRef.current?.click();
    } else if (section === 'seo') {
      fileInputRefSEO.current?.click();
    }
  };

  // Handle form submission
  const handleAddCategory = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      name: formData.name,
      slug: formData.slug,
      image: draggedFile ? URL.createObjectURL(draggedFile) : "https://via.placeholder.com/100",
    };
    setCategories([newCategory, ...categories]);
    
    // Reset form
    setFormData({
      name: "",
      slug: "",
      type: "Category",
      darkColor: "#000000",
      lightColor: "#ffffff",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      schemaMarkup: "",
    });
    setDraggedFile(null);
    setDraggedFileSEO(null);
    alert("Category added successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
        {/* Header with Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
          <div className="flex items-center gap-2 text-sm">
            <FiHome className="text-blue-600" />
            <a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Category</span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Category Form */}
          <div className="xl:col-span-5">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Category</h2>
              </div>

              <form onSubmit={handleAddCategory} className="p-5">
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

                {/* Name Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter the name of the Category here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Slug Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Enter the slug of the Category here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Type Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="Category">Category</option>
                    <option value="Subcategory">Subcategory</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 ml-1">(We recommend 60x60 pixels)</span>
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'image')}
                    className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    onClick={() => handleBrowseClick('image')}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e, 'image')}
                      className="hidden"
                    />
                    {draggedFile ? (
                      <div className="text-sm text-gray-700">
                        <p className="font-medium">{draggedFile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(draggedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-600 text-sm">
                          Drag & Drop files here or{" "}
                          <span className="text-blue-600 font-medium">Browse Files</span>
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dark Theme Color <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData.darkColor}
                        onChange={(e) => setFormData({ ...formData, darkColor: e.target.value })}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.darkColor}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Light Theme Color <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData.lightColor}
                        onChange={(e) => setFormData({ ...formData, lightColor: e.target.value })}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.lightColor}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-white rounded-lg border border-gray-200 mb-6">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-base font-semibold text-gray-800">SEO Settings</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Language Tabs for SEO */}
                    <div className="flex gap-4 border-b border-gray-200">
                      {["English(Default)", "Hindi", "Arabic"].map((tab) => (
                        <button
                          key={tab}
                          type="button"
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

                    {/* Meta Title */}
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                        <span className="text-gray-400 cursor-help" title="Enter meta title">ⓘ</span>
                      </label>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                        placeholder="Enter the title here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maximum 255 characters</p>
                    </div>

                    {/* Meta Description */}
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                        <span className="text-gray-400 cursor-help" title="Enter meta description">ⓘ</span>
                      </label>
                      <textarea
                        value={formData.metaDescription}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        placeholder="Enter Meta Description Here"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
                    </div>

                    {/* Meta Keywords */}
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                        Meta Keywords
                        <span className="text-gray-400 cursor-help" title="Enter meta keywords">ⓘ</span>
                      </label>
                      <input
                        type="text"
                        value={formData.metaKeywords}
                        onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                        placeholder="Press enter to add keyword"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    {/* Schema Markup */}
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                        Schema Markup
                        <span className="text-gray-400 cursor-help" title="Enter schema markup">ⓘ</span>
                      </label>
                      <textarea
                        value={formData.schemaMarkup}
                        onChange={(e) => setFormData({ ...formData, schemaMarkup: e.target.value })}
                        placeholder="Enter Schema Markup Here"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                      />
                    </div>

                    {/* Meta Image Upload */}
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                        Meta Image
                        <span className="text-gray-400 cursor-help" title="Upload meta image">ⓘ</span>
                        <span className="text-xs text-gray-500">(We recommend 1200 x 630 pixels)</span>
                      </label>
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'seo')}
                        className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                        onClick={() => handleBrowseClick('seo')}
                      >
                        <input
                          ref={fileInputRefSEO}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e, 'seo')}
                          className="hidden"
                        />
                        {draggedFileSEO ? (
                          <div className="text-sm text-gray-700">
                            <p className="font-medium">{draggedFileSEO.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {(draggedFileSEO.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-600 text-sm">
                              Drag & Drop files here or{" "}
                              <span className="text-blue-600 font-medium">Browse Files</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              Supported formats: JPG, JPEG, PNG, GIF
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Add Category
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Category List */}
          <div className="xl:col-span-7">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Category List</h2>
              </div>

              <div className="p-5">
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                  <div className="flex flex-1 gap-2">
                    <input
                      type="text"
                      placeholder="Search here!"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      <FiSearch size={18} />
                    </button>
                  </div>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <FiFilter size={16} />
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <FiDownload size={16} />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Slug
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Operations
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentEntries.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-600">{category.id}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-12 h-12 rounded-md object-cover border border-gray-200"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/100/e5e7eb/9ca3af?text=${category.name.charAt(0)}`;
                              }}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-gray-800 font-medium">{category.name}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-gray-600">{category.slug}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDelete(category.id)}
                              className="text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <FiMoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Showing</span>
                    <span className="font-medium">{indexOfFirstEntry + 1}</span>
                    <span>to</span>
                    <span className="font-medium">
                      {Math.min(indexOfLastEntry, filteredCategories.length)}
                    </span>
                    <span>of</span>
                    <span className="font-medium">{filteredCategories.length}</span>
                    <span>entries</span>
                    <select
                      value={entriesPerPage}
                      onChange={(e) => {
                        setEntriesPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span>entries per page</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, idx) => {
                      const pageNum = idx + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-1 rounded text-sm transition-colors ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return <span key={pageNum} className="px-2 text-gray-500">...</span>;
                      }
                      return null;
                    })}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
