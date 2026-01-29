import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { FiSearch, FiFilter, FiDownload, FiHome, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

// Dummy data for bookings
const dummyBookings = [
  {
    id: "BK001",
    userId: "USR12345",
    customer: { name: "John Doe", email: "john@example.com", phone: "+1234567890" },
    provider: { name: "Jane Smith", email: "jane@example.com", rating: 4.5 },
    service: "Home Cleaning",
    finalTotal: 150.00,
    status: "completed",
    bookingDate: "2026-01-15",
    paymentStatus: "paid"
  },
  {
    id: "BK002",
    userId: "USR12346",
    customer: { name: "Alice Johnson", email: "alice@example.com", phone: "+1234567891" },
    provider: { name: "Bob Wilson", email: "bob@example.com", rating: 4.8 },
    service: "Plumbing Service",
    finalTotal: 250.00,
    status: "pending",
    bookingDate: "2026-01-20",
    paymentStatus: "pending"
  },
  {
    id: "BK003",
    userId: "USR12347",
    customer: { name: "Michael Brown", email: "michael@example.com", phone: "+1234567892" },
    provider: { name: "Sarah Davis", email: "sarah@example.com", rating: 4.9 },
    service: "Electrical Repair",
    finalTotal: 180.00,
    status: "in-progress",
    bookingDate: "2026-01-22",
    paymentStatus: "paid"
  },
  {
    id: "BK004",
    userId: "USR12348",
    customer: { name: "Emma Wilson", email: "emma@example.com", phone: "+1234567893" },
    provider: { name: "David Lee", email: "david@example.com", rating: 4.6 },
    service: "AC Repair",
    finalTotal: 320.00,
    status: "completed",
    bookingDate: "2026-01-18",
    paymentStatus: "paid"
  },
  {
    id: "BK005",
    userId: "USR12349",
    customer: { name: "Oliver Taylor", email: "oliver@example.com", phone: "+1234567894" },
    provider: { name: "Emily Martinez", email: "emily@example.com", rating: 4.7 },
    service: "Painting Service",
    finalTotal: 450.00,
    status: "cancelled",
    bookingDate: "2026-01-25",
    paymentStatus: "refunded"
  },
  {
    id: "BK006",
    userId: "USR12350",
    customer: { name: "Sophia Anderson", email: "sophia@example.com", phone: "+1234567895" },
    provider: { name: "James White", email: "james@example.com", rating: 4.4 },
    service: "Carpentry",
    finalTotal: 280.00,
    status: "pending",
    bookingDate: "2026-01-27",
    paymentStatus: "pending"
  },
  {
    id: "BK007",
    userId: "USR12351",
    customer: { name: "Liam Harris", email: "liam@example.com", phone: "+1234567896" },
    provider: { name: "Linda Clark", email: "linda@example.com", rating: 4.8 },
    service: "Pest Control",
    finalTotal: 120.00,
    status: "completed",
    bookingDate: "2026-01-10",
    paymentStatus: "paid"
  },
  {
    id: "BK008",
    userId: "USR12352",
    customer: { name: "Isabella Lewis", email: "isabella@example.com", phone: "+1234567897" },
    provider: { name: "Robert Walker", email: "robert@example.com", rating: 4.5 },
    service: "Appliance Repair",
    finalTotal: 195.00,
    status: "in-progress",
    bookingDate: "2026-01-28",
    paymentStatus: "paid"
  }
];

export default function BookingsPage() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setBookings(dummyBookings);
      setFilteredBookings(dummyBookings);
      setLoading(false);
    }, 1500); // Simulate 1.5s loading time

    return () => clearTimeout(timer);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filtered = bookings.filter(booking => 
      booking.id.toLowerCase().includes(value) ||
      booking.userId.toLowerCase().includes(value) ||
      booking.customer.name.toLowerCase().includes(value) ||
      booking.provider.name.toLowerCase().includes(value) ||
      booking.service.toLowerCase().includes(value) ||
      booking.status.toLowerCase().includes(value)
    );
    
    setFilteredBookings(filtered);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
      </span>
    );
  };

  // Handle action buttons
  const handleView = (booking) => {
    console.log("View booking:", booking);
    alert(`Viewing booking: ${booking.id}`);
  };

  const handleEdit = (booking) => {
    console.log("Edit booking:", booking);
    alert(`Editing booking: ${booking.id}`);
  };

  const handleDelete = (booking) => {
    if (window.confirm(`Are you sure you want to delete booking ${booking.id}?`)) {
      const updated = bookings.filter(b => b.id !== booking.id);
      setBookings(updated);
      setFilteredBookings(updated.filter(b => 
        b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      alert(`Booking ${booking.id} deleted successfully`);
    }
  };

  const handleDownload = () => {
    alert("Downloading bookings data...");
    console.log("Download data:", filteredBookings);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Bookings</h1>
          <div className="flex items-center text-xs md:text-sm text-gray-500 gap-2">
            <FiHome className="text-blue-500" />
            <span className="text-blue-500">Dashboard</span>
            <span>/</span>
            <span>Bookings</span>
          </div>
        </div>

        {/* Content Card */}
        <div className="mt-4 md:mt-6 bg-white rounded-lg shadow-sm p-4 md:p-6">
          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 items-stretch sm:items-center mb-4 md:mb-6">
            <div className="flex flex-1 min-w-full sm:min-w-0 sm:w-auto md:w-96">
              <input
                type="text"
                placeholder="Search by ID, customer, provider, service..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full border border-gray-300 rounded-l-md px-3 md:px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 px-3 md:px-4 flex items-center justify-center rounded-r-md text-white hover:bg-blue-700 transition-colors">
                <FiSearch />
              </button>
            </div>

            <button 
              className="border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => alert("Filter functionality")}
            >
              <FiFilter size={18} />
            </button>

            <button 
              className="border border-gray-300 px-3 md:px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors text-sm"
              onClick={handleDownload}
            >
              <FiDownload />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>

          {/* Stats Summary */}
          {!loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">Total Bookings</p>
                <p className="text-lg md:text-2xl font-bold text-blue-600">{bookings.length}</p>
              </div>
              <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">Completed</p>
                <p className="text-lg md:text-2xl font-bold text-green-600">
                  {bookings.filter(b => b.status === "completed").length}
                </p>
              </div>
              <div className="bg-yellow-50 p-3 md:p-4 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">Pending</p>
                <p className="text-lg md:text-2xl font-bold text-yellow-600">
                  {bookings.filter(b => b.status === "pending").length}
                </p>
              </div>
              <div className="bg-purple-50 p-3 md:p-4 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">In Progress</p>
                <p className="text-lg md:text-2xl font-bold text-purple-600">
                  {bookings.filter(b => b.status === "in-progress").length}
                </p>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-3 md:px-4 py-3 text-left whitespace-nowrap">Booking ID</th>
                  <th className="px-3 md:px-4 py-3 text-left whitespace-nowrap">User ID</th>
                  <th className="px-3 md:px-4 py-3 text-left whitespace-nowrap">Customer</th>
                  <th className="px-3 md:px-4 py-3 text-left whitespace-nowrap">Provider</th>
                  <th className="px-3 md:px-4 py-3 text-left whitespace-nowrap">Service</th>
                  <th className="px-3 md:px-4 py-3 text-left whitespace-nowrap">Final Total</th>
                  <th className="px-3 md:px-4 py-3 text-left whitespace-nowrap">Status</th>
                  <th className="px-3 md:px-4 py-3 text-left whitespace-nowrap">Date</th>
                  <th className="px-3 md:px-4 py-3 text-left whitespace-nowrap">Operations</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-16 md:py-20">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-600"></div>
                        <p className="text-gray-500 text-sm md:text-base">Loading, please wait...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-16 md:py-20 text-gray-500">
                      <p className="text-sm md:text-base">No bookings found</p>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-3 md:px-4 py-3 whitespace-nowrap font-medium text-blue-600">
                        {booking.id}
                      </td>
                      <td className="px-3 md:px-4 py-3 whitespace-nowrap text-gray-700">
                        {booking.userId}
                      </td>
                      <td className="px-3 md:px-4 py-3">
                        <div className="min-w-[150px]">
                          <p className="font-medium text-gray-900">{booking.customer.name}</p>
                          <p className="text-xs text-gray-500">{booking.customer.email}</p>
                        </div>
                      </td>
                      <td className="px-3 md:px-4 py-3">
                        <div className="min-w-[150px]">
                          <p className="font-medium text-gray-900">{booking.provider.name}</p>
                          <p className="text-xs text-gray-500">Rating: {booking.provider.rating} ⭐</p>
                        </div>
                      </td>
                      <td className="px-3 md:px-4 py-3 whitespace-nowrap text-gray-700">
                        {booking.service}
                      </td>
                      <td className="px-3 md:px-4 py-3 whitespace-nowrap font-semibold text-gray-900">
                        ${booking.finalTotal.toFixed(2)}
                      </td>
                      <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-3 md:px-4 py-3 whitespace-nowrap text-gray-700">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </td>
                      <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(booking)}
                            className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded transition-colors"
                            title="View"
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(booking)}
                            className="text-green-600 hover:text-green-800 p-1.5 hover:bg-green-50 rounded transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(booking)}
                            className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          {!loading && filteredBookings.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-600">
              <p>
                Showing <span className="font-medium">{filteredBookings.length}</span> of{" "}
                <span className="font-medium">{bookings.length}</span> bookings
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
