import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import { 
  ChevronRight, 
  Search, 
  Trash2, 
  Download, 
  Send,
  ChevronLeft,
  ChevronDown
} from "lucide-react";

// Mock email history data
const mockEmailHistory = [
  { id: 13, subject: "Test", type: "Provider", sentDate: "2026-02-03", recipientCount: 5 },
  { id: 12, subject: "Number of Processing", type: "All Users", sentDate: "2026-02-02", recipientCount: 2169 },
  { id: 11, subject: "test", type: "Provider", sentDate: "2026-02-01", recipientCount: 246 },
  { id: 10, subject: "test", type: "Customer", sentDate: "2026-01-31", recipientCount: 850 },
  { id: 9, subject: "asAS", type: "Customer", sentDate: "2026-01-30", recipientCount: 112 },
  { id: 8, subject: "Feedback", type: "Customer", sentDate: "2026-01-29", recipientCount: 340 },
  { id: 7, subject: "hi", type: "Customer", sentDate: "2026-01-28", recipientCount: 95 },
  { id: 6, subject: "saefwf", type: "Provider", sentDate: "2026-01-27", recipientCount: 18 },
  { id: 5, subject: "Welcome", type: "All Users", sentDate: "2026-01-26", recipientCount: 3019 },
  { id: 4, subject: "Update Notice", type: "Provider", sentDate: "2026-01-25", recipientCount: 246 },
  { id: 3, subject: "Payment Reminder", type: "Customer", sentDate: "2026-01-24", recipientCount: 562 },
  { id: 2, subject: "Promotion", type: "All Users", sentDate: "2026-01-23", recipientCount: 3019 },
  { id: 1, subject: "New Service", type: "Provider", sentDate: "2026-01-22", recipientCount: 246 }
];

// Mock recipient data
const mockRecipients = {
  "all-users": { label: "All Users", count: 2169 },
  "customers": { label: "Customers", count: 1850 },
  "providers": { label: "Providers", count: 246 },
  "admins": { label: "Admins", count: 12 },
  "specific": { label: "Specific Users", count: 0 }
};

export default function EmailPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("send");
  const [formData, setFormData] = useState({
    sendTo: "all-users",
    subject: "",
    cc: "",
    bcc: "",
    template: ""
  });
  
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [emailHistory, setEmailHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  // Available parameters for template
  const parameters = [
    { id: "user-id", label: "User ID" },
    { id: "user-name", label: "User Name" },
    { id: "company-name", label: "Company Name" },
    { id: "site-url", label: "Site URL" },
    { id: "contact-info", label: "Contact Info" },
    { id: "company-logo", label: "Company Logo" },
    { id: "unsubscribe-link", label: "Unsubscribe Link" }
  ];

  // Predefined email templates
  const emailTemplates = [
    { id: "welcome", name: "Welcome Email", content: "Welcome to our platform! We're excited to have you here.\n\n[User Name], your account is now active.\n\nBest regards,\nAdmin Team" },
    { id: "promotion", name: "Promotion", content: "Check out our latest promotions!\n\nVisit: [Site URL]\n\nThank you,\n[Company Name]" },
    { id: "reminder", name: "Payment Reminder", content: "Hi [User Name],\n\nThis is a reminder about your pending payment.\n\nPlease contact us at [Contact Info]\n\nThank you" },
    { id: "notification", name: "General Notification", content: "Dear [User Name],\n\nWe have an important update for you.\n\nPlease check your account for more details.\n\nBest regards,\n[Company Name]" }
  ];

  // Load email history
  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailHistory(mockEmailHistory);
      setFilteredHistory(mockEmailHistory);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filtered = emailHistory.filter(email =>
      email.subject.toLowerCase().includes(value) ||
      email.type.toLowerCase().includes(value)
    );
    
    setFilteredHistory(filtered);
    setCurrentPage(1);
  };

  // Handle parameter toggle
  const toggleParameter = (paramId) => {
    setSelectedParameters(prev =>
      prev.includes(paramId)
        ? prev.filter(id => id !== paramId)
        : [...prev, paramId]
    );
  };

  // Handle template selection
  const selectTemplate = (template) => {
    setFormData(prev => ({
      ...prev,
      subject: template.name,
      template: template.content
    }));
    setShowTemplateDropdown(false);
  };

  // Handle form submission
  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!formData.subject.trim()) {
      alert("Please enter a subject");
      return;
    }
    if (!formData.template.trim()) {
      alert("Please enter email content");
      return;
    }
    
    console.log("Sending email with data:", {
      ...formData,
      parameters: selectedParameters,
      recipientCount: mockRecipients[formData.sendTo].count
    });
    
    alert(`Email sent successfully to ${mockRecipients[formData.sendTo].label}!`);
    
    // Reset form
    setFormData({
      sendTo: "all-users",
      subject: "",
      cc: "",
      bcc: "",
      template: ""
    });
    setSelectedParameters([]);
  };

  // Delete email from history
  const handleDeleteEmail = (id) => {
    if (window.confirm("Are you sure you want to delete this email record?")) {
      setEmailHistory(prev => prev.filter(email => email.id !== id));
      setFilteredHistory(prev => prev.filter(email => email.id !== id));
    }
  };

  // Download email history
  const handleDownload = () => {
    const csv = [
      ["ID", "Subject", "Type", "Date", "Recipients"],
      ...filteredHistory.map(email => [
        email.id,
        email.subject,
        email.type,
        email.sentDate,
        email.recipientCount
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `email-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 bg-[#f6f7fb] min-h-screen">
        
        {/* ========== BREADCRUMB ========== */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <button 
            onClick={() => navigate("/")}
            className="text-[#0d6efd] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>📊 Dashboard</span>
          </button>
          <ChevronRight size={16} />
          <span className="text-gray-800 font-medium">Email</span>
        </div>

        {/* ========== HEADER ========== */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Email</h1>
        </div>

        {/* ========== MAIN CONTENT ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ========== LEFT SIDE - SEND EMAIL FORM ========== */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-[#e9ecef] p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Send Email</h2>

              <form onSubmit={handleSendEmail} className="space-y-4">
                
                {/* Send To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send To <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.sendTo}
                    onChange={(e) => setFormData(prev => ({ ...prev, sendTo: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0d6efd] bg-white"
                  >
                    <option value="all-users">All Users ({mockRecipients["all-users"].count})</option>
                    <option value="customers">Customers ({mockRecipients["customers"].count})</option>
                    <option value="providers">Providers ({mockRecipients["providers"].count})</option>
                    <option value="admins">Admins ({mockRecipients["admins"].count})</option>
                  </select>
                </div>

                {/* Parameters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Parameters
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {parameters.map(param => (
                      <button
                        key={param.id}
                        type="button"
                        onClick={() => toggleParameter(param.id)}
                        className={`text-xs px-3 py-2 rounded-md font-medium transition-colors ${
                          selectedParameters.includes(param.id)
                            ? "bg-[#0d6efd] text-white"
                            : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        }`}
                      >
                        {param.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter email subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0d6efd]"
                  />
                </div>

                {/* BCC */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BCC
                  </label>
                  <input
                    type="email"
                    value={formData.bcc}
                    onChange={(e) => setFormData(prev => ({ ...prev, bcc: e.target.value }))}
                    placeholder="Press enter to add BCC"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0d6efd] text-sm"
                  />
                </div>

                {/* CC */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CC
                  </label>
                  <input
                    type="email"
                    value={formData.cc}
                    onChange={(e) => setFormData(prev => ({ ...prev, cc: e.target.value }))}
                    placeholder="Press enter to add CC"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0d6efd] text-sm"
                  />
                </div>

                {/* Template Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Templates
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex justify-between items-center hover:bg-gray-50 bg-white"
                  >
                    <span className="text-gray-600 text-sm">Select a template...</span>
                    <ChevronDown size={16} className={`transition-transform ${showTemplateDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showTemplateDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      {emailTemplates.map(template => (
                        <button
                          key={template.id}
                          type="button"
                          onClick={() => selectTemplate(template)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 text-sm"
                        >
                          {template.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Email Template Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.template}
                    onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
                    placeholder="Enter your email content here. You can use parameters like [User Name], [Site URL], etc."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0d6efd] resize-vertical text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use parameters like [User Name], [Site URL], [Company Name] to personalize emails
                  </p>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  className="w-full bg-[#0d6efd] text-white py-2 rounded-md font-medium hover:bg-[#0b5ed7] transition-colors flex items-center justify-center gap-2 mt-6"
                >
                  <Send size={18} />
                  Send Email
                </button>
              </form>
            </div>
          </div>

          {/* ========== RIGHT SIDE - EMAIL HISTORY ========== */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-[#e9ecef] p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Email List</h2>

              {/* Search and Download */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search here!"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[#0d6efd]"
                  />
                  <button className="absolute right-0 top-0 bottom-0 bg-[#0d6efd] text-white px-4 rounded-r-md hover:bg-[#0b5ed7] transition-colors">
                    <Search size={18} />
                  </button>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>

              {/* Table */}
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d6efd]"></div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Subject</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700">Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map(email => (
                            <tr key={email.id} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-gray-900">{email.id}</td>
                              <td className="px-4 py-3 text-gray-700">{email.subject}</td>
                              <td className="px-4 py-3">
                                <span className={`text-xs px-2 py-1 rounded font-medium ${
                                  email.type === 'Provider' ? 'bg-orange-100 text-orange-600' :
                                  email.type === 'Customer' ? 'bg-green-100 text-green-600' :
                                  'bg-purple-100 text-purple-600'
                                }`}>
                                  {email.type}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-600">{email.sentDate}</td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => handleDeleteEmail(email.id)}
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                              No email history found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t gap-4">
                      <div className="text-sm text-gray-600">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredHistory.length)} of {filteredHistory.length} entries
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-md border ${
                            currentPage === 1
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-[#0d6efd] hover:bg-[#f1f6ff] cursor-pointer'
                          }`}
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <div className="flex gap-1">
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            if (
                              pageNumber === 1 ||
                              pageNumber === totalPages ||
                              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                              return (
                                <button
                                  key={pageNumber}
                                  onClick={() => setCurrentPage(pageNumber)}
                                  className={`px-3 py-1 rounded-md border text-sm ${
                                    currentPage === pageNumber
                                      ? 'bg-[#0d6efd] text-white border-[#0d6efd]'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {pageNumber}
                                </button>
                              );
                            } else if (
                              pageNumber === currentPage - 2 ||
                              pageNumber === currentPage + 2
                            ) {
                              return <span key={pageNumber} className="px-2 text-gray-500">...</span>;
                            }
                            return null;
                          })}
                        </div>

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-md border ${
                            currentPage === totalPages
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-[#0d6efd] hover:bg-[#f1f6ff] cursor-pointer'
                          }`}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#0d6efd]"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
