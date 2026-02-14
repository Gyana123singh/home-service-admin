import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Users,
  Briefcase,
  CalendarCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock data for recent bookings
const mockRecentBookings = [
  {
    id: 1,
    customer: "BEST",
    provider: "TeamWork Group",
    startTime: "29-02-2024 09:30 AM",
    endTime: "29-02-2024 11:30 AM",
    status: "cancelled"
  },
  {
    id: 2,
    customer: "John Doe",
    provider: "Electric Pro",
    startTime: "01-03-2024 10:00 AM",
    endTime: "01-03-2024 12:00 PM",
    status: "completed"
  },
  {
    id: 3,
    customer: "Jane Smith",
    provider: "CleanCo Services",
    startTime: "02-03-2024 02:00 PM",
    endTime: "02-03-2024 04:00 PM",
    status: "pending"
  },
  {
    id: 4,
    customer: "Mike Johnson",
    provider: "QuickFix Solutions",
    startTime: "03-03-2024 09:00 AM",
    endTime: "03-03-2024 11:00 AM",
    status: "in-progress"
  },
  {
    id: 5,
    customer: "Sarah Williams",
    provider: "HomeHelpers",
    startTime: "04-03-2024 03:00 PM",
    endTime: "04-03-2024 05:00 PM",
    status: "completed"
  },
  {
    id: 6,
    customer: "David Brown",
    provider: "TechRepair",
    startTime: "05-03-2024 11:00 AM",
    endTime: "05-03-2024 01:00 PM",
    status: "cancelled"
  },
  {
    id: 7,
    customer: "Emily Davis",
    provider: "ProServices",
    startTime: "06-03-2024 08:00 AM",
    endTime: "06-03-2024 10:00 AM",
    status: "pending"
  },
  {
    id: 8,
    customer: "Chris Wilson",
    provider: "Expert Solutions",
    startTime: "07-03-2024 01:00 PM",
    endTime: "07-03-2024 03:00 PM",
    status: "completed"
  },
  {
    id: 9,
    customer: "Lisa Anderson",
    provider: "Quality Services",
    startTime: "08-03-2024 10:30 AM",
    endTime: "08-03-2024 12:30 PM",
    status: "in-progress"
  },
  {
    id: 10,
    customer: "Tom Martinez",
    provider: "Fast Repairs",
    startTime: "09-03-2024 02:30 PM",
    endTime: "09-03-2024 04:30 PM",
    status: "pending"
  }
];

export default function Dashboard() {
  // State for dashboard statistics
  const [dashboardStats, setDashboardStats] = useState({
    totalCustomers: 0,
    totalServices: 0,
    bookingStatistics: 0,
    recentBookingsCount: 0
  });

  // State for recent bookings with pagination
  const [recentBookings, setRecentBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  
  // State for revenue filter
  const [revenueFilter, setRevenueFilter] = useState('total');
  
  // Mock revenue data for visualization
  const [revenueData, setRevenueData] = useState({
    total: [45, 52, 48, 65, 58, 70, 75],
    admin: [15, 18, 16, 22, 19, 24, 26],
    provider: [30, 34, 32, 43, 39, 46, 49]
  });

  // Fetch dashboard data
  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set dashboard stats
        setDashboardStats({
          totalCustomers: 2169,
          totalServices: 119,
          bookingStatistics: 1243,
          recentBookingsCount: mockRecentBookings.length
        });

        // Set recent bookings
        setRecentBookings(mockRecentBookings);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Pagination calculations
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = recentBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(recentBookings.length / bookingsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      completed: "bg-green-100 text-green-600 border-green-600",
      pending: "bg-yellow-100 text-yellow-600 border-yellow-600",
      "in-progress": "bg-blue-100 text-blue-600 border-blue-600",
      cancelled: "bg-red-100 text-red-500 border-red-500"
    };
    
    return (
      <span className={`${statusStyles[status] || "bg-gray-100 text-gray-600 border-gray-600"} border px-2 py-1 rounded text-xs font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">

        {/* ================= TOP ROW ================= */}
        <div className="grid grid-cols-12 gap-6">

          {/* Welcome */}
          <div className="col-span-12 xl:col-span-4 bg-[#0d6efd] text-white rounded-lg p-6 h-[140px]">
            <p className="text-sm opacity-90">Good afternoon</p>
            <h2 className="text-xl font-semibold mt-2">Admin</h2>
            <p className="mt-4 text-sm opacity-90">
              View Your Current Sales & Summary.
            </p>
          </div>

          {/* Total Customer */}
          <div className="col-span-12 xl:col-span-4 bg-white rounded-lg border p-6 h-[140px]">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-md">
                <Users className="text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {loading ? "..." : dashboardStats.totalCustomers.toLocaleString()}
                </h3>
                <p className="text-gray-400 text-sm">Total Customer</p>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 px-4 py-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm">Total Customer</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Income Revenue */}
          <div className="col-span-12 xl:col-span-4 bg-white rounded-lg border p-6 h-[140px]">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-700">Income Revenue</h3>
                <p className="text-2xl font-bold text-[#0d6efd] mt-1">
                  ${loading ? "..." : "12,450"}
                </p>
              </div>

              <div className="flex gap-1">
                <button 
                  onClick={() => setRevenueFilter('total')}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    revenueFilter === 'total' 
                      ? 'bg-[#0d6efd] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Total
                </button>
                <button 
                  onClick={() => setRevenueFilter('admin')}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    revenueFilter === 'admin' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Admin
                </button>
                <button 
                  onClick={() => setRevenueFilter('provider')}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    revenueFilter === 'provider' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Provider
                </button>
              </div>
            </div>

            {/* Mini Chart Visualization */}
            <div className="h-[50px] flex items-end justify-between gap-1 mt-2">
              {revenueData[revenueFilter].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full rounded-t transition-all ${
                      revenueFilter === 'total' ? 'bg-[#0d6efd]' :
                      revenueFilter === 'admin' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`}
                    style={{ height: `${value}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SECOND ROW ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">

          {/* Total Services Card */}
          <div className="bg-white rounded-lg border p-6 flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-md flex-shrink-0">
                <Briefcase className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? "..." : dashboardStats.totalServices}
                </h3>
                <p className="text-gray-500 text-sm">Total Services</p>
              </div>
            </div>

            <button className="mt-4 bg-blue-50 text-blue-600 px-4 py-2 rounded-md flex justify-between items-center cursor-pointer hover:bg-blue-100 transition-colors text-sm font-medium">
              View Details
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Booking Statistics Card */}
          <div className="bg-white rounded-lg border p-6 flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-md flex-shrink-0">
                <CalendarCheck className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? "..." : dashboardStats.bookingStatistics.toLocaleString()}
                </h3>
                <p className="text-gray-500 text-sm">Total Bookings</p>
              </div>
            </div>

            <button className="mt-4 bg-orange-50 text-orange-600 px-4 py-2 rounded-md flex justify-between items-center cursor-pointer hover:bg-orange-100 transition-colors text-sm font-medium">
              View Details
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Total Providers Card */}
          <div className="bg-white rounded-lg border p-6 flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-4 rounded-md flex-shrink-0">
                <Users className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? "..." : "246"}
                </h3>
                <p className="text-gray-500 text-sm">Total Providers</p>
              </div>
            </div>

            <button className="mt-4 bg-purple-50 text-purple-600 px-4 py-2 rounded-md flex justify-between items-center cursor-pointer hover:bg-purple-100 transition-colors text-sm font-medium">
              View Details
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* ================= THIRD ROW ================= */}
        <div className="grid grid-cols-12 gap-6 mt-6">

          {/* Top Providers */}
          <div className="col-span-12 xl:col-span-8 bg-white rounded-lg border p-6">
            <div className="flex justify-between mb-6">
              <h3 className="font-semibold">Top Providers</h3>
              <select className="border px-2 py-1 text-sm rounded">
                <option>Bookings</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <Provider name="Electric" rating="4.6" count="239 Booking Completed" />
              <Provider name="World Clean Pvt" rating="5.0" count="6 Booking Completed" />
              <Provider name="StormBrand" rating="4.6" count="1 Booking Completed" />
            </div>
          </div>

          {/* Trending */}
          <div className="col-span-12 xl:col-span-4 bg-white rounded-lg border p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Top Trending Services</h3>
              <select className="border px-2 py-1 text-sm rounded">
                <option>All</option>
              </select>
            </div>

            <Trending title="Inverter Setup & Battery Service" count="91" />
            <Trending title="Geyser/Water Heater Repair" count="39" />
            <Trending title="Switch & Socket Repair" count="19" />
            <Trending title="Ceiling Fan Installation" count="14" />
          </div>
        </div>

        {/* ================= BOOKINGS ================= */}
        <div className="bg-white rounded-lg border p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">
              Recent Bookings: {loading ? "..." : dashboardStats.recentBookingsCount}
            </h3>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d6efd]"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Customer</th>
                      <th className="p-3 text-left">Provider</th>
                      <th className="p-3 text-left">Starting time</th>
                      <th className="p-3 text-left">Ending time</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentBookings.length > 0 ? (
                      currentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-3 font-medium">{booking.customer}</td>
                          <td className="p-3 text-gray-600">{booking.provider}</td>
                          <td className="p-3 text-gray-600">{booking.startTime}</td>
                          <td className="p-3 text-gray-600">{booking.endTime}</td>
                          <td className="p-3">{getStatusBadge(booking.status)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          No bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstBooking + 1} to {Math.min(indexOfLastBooking, recentBookings.length)} of {recentBookings.length} entries
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md border ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-[#0d6efd] hover:bg-[#f1f6ff] cursor-pointer'
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        // Show first page, last page, current page, and pages around current
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
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
                          return <span key={pageNumber} className="px-2">...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md border ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-[#0d6efd] hover:bg-[#f1f6ff] cursor-pointer'
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}

/* ================= COMPONENTS ================= */

function Provider({ name, rating, count }) {
  return (
    <div className="bg-gray-50 border rounded-lg p-4">
      <div className="w-12 h-12 rounded-full bg-gray-300 mx-auto mb-2" />
      <h4 className="font-medium">{name}</h4>
      <p className="text-orange-400 text-sm">★★★★★ ({rating})</p>
      <button className="mt-3 bg-[#0d6efd] text-white text-xs px-3 py-1 rounded">
        {count}
      </button>
    </div>
  );
}

function Trending({ title, count }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <p className="text-sm">{title}</p>
      <span className="bg-[#0d6efd] text-white text-xs px-2 py-1 rounded">
        {count}
      </span>
    </div>
  );
}
