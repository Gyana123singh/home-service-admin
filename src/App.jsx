import { useEffect } from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks";
import ScrollRestoration from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/dashboard/Dashboard";
import ProvidersPage from "./pages/providers/ProvidersList";
import AddNewProvidersPage from "./pages/providers/AddNewProviders";
import BulkProviderUpdatePage from "./pages/providers/BulkProviderUpdate";
import PaymentRequestPage from "./pages/paymentRequest/PaymentRequest";
import SettlementsPage from "./pages/settlement/Settlements";
import SettlementHistoryPage from "./pages/settlement/SettlementHistory";
import CashCollectionPage from "./pages/cashCollection/CashCollection";
import CashCollectionListPage from "./pages/cashCollection/CashCollectionList";
import BookingsPage from "./pages/bookings/Bookings";
import BookingPaymentPage from "./pages/bookingPayment/BookingPayment";
import CustomJobRequestsPage from "./pages/customJobRequest/CustomJobRequests";
import ServicesPage from "./pages/services/ServicesList";
import AddNewServicePage from "./pages/services/AddNewService";
import BulkServiceUpdatePage from "./pages/services/BulkServiceUpdate";
import ServiceCategoriesPage from "./pages/serviceCategories/ServiceCategories";
import SlidersPage from "./pages/slider/Sliders";
import CustomersPage from "./pages/Customers";
import TransactionsPage from "./pages/transactions/Transactions";
import PaymentRefundsPage from "./pages/paymentRefunds/PaymentRefunds";
import AddressesPage from "./pages/addresses/Addresses";
import UserQueriesPage from "./pages/userQueries/UserQueries";
import ReviewsRatingsPage from "./pages/reviewsRatings/ReviewsRatings";
import SupportTicketsPage from "./pages/SupportTickets";
import PromoCodesPage from "./pages/PromoCodes";
import PromoUsagePage from "./pages/PromoUsage";
import NotificationsPage from "./pages/Notifications";
import EmailPage from "./pages/Email";
import SubscriptionsPage from "./pages/subscription/Subscriptions";
import SubscriberListPage from "./pages/subscription/SubscriberList";
import SystemSettingsPage from "./pages/SystemSettings";
import FAQsPage from "./pages/FAQs";
import SystemUsersPage from "./pages/SystemUsers";
import DatabaseBackupPage from "./pages/DatabaseBackup";
import GoogleSuccess from "./api/googleSuccess/GoogleSuccess";
import Coupons from "./pages/coupons/Coupons";

function App() {
  const { isLoggedIn, isLoading } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/login",
      element: isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/providers-list",
      element: (
        <ProtectedRoute>
          <ProvidersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/providers/add",
      element: (
        <ProtectedRoute>
          <AddNewProvidersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/providers/bulk-update",
      element: (
        <ProtectedRoute>
          <BulkProviderUpdatePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/payment-request",
      element: (
        <ProtectedRoute>
          <PaymentRequestPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settlements",
      element: (
        <ProtectedRoute>
          <SettlementsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settlement-history",
      element: (
        <ProtectedRoute>
          <SettlementHistoryPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cash-collection",
      element: (
        <ProtectedRoute>
          <CashCollectionPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cash-collection-list",
      element: (
        <ProtectedRoute>
          <CashCollectionListPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/bookings",
      element: (
        <ProtectedRoute>
          <BookingsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/booking-payment",
      element: (
        <ProtectedRoute>
          <BookingPaymentPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/custom-jobs",
      element: (
        <ProtectedRoute>
          <CustomJobRequestsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/services",
      element: (
        <ProtectedRoute>
          <ServicesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/services/add",
      element: (
        <ProtectedRoute>
          <AddNewServicePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/services/bulk-update",
      element: (
        <ProtectedRoute>
          <BulkServiceUpdatePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/service-categories",
      element: (
        <ProtectedRoute>
          <ServiceCategoriesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/sliders",
      element: (
        <ProtectedRoute>
          <SlidersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/coupons",
      element: (
        <ProtectedRoute>
          <Coupons />
        </ProtectedRoute>
      ),
    },

    {
      path: "/customers",
      element: (
        <ProtectedRoute>
          <CustomersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/transactions",
      element: (
        <ProtectedRoute>
          <TransactionsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/payment-refunds",
      element: (
        <ProtectedRoute>
          <PaymentRefundsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/addresses",
      element: (
        <ProtectedRoute>
          <AddressesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user-queries",
      element: (
        <ProtectedRoute>
          <UserQueriesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reviews",
      element: (
        <ProtectedRoute>
          <ReviewsRatingsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/support-tickets",
      element: (
        <ProtectedRoute>
          <SupportTicketsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/promo-codes",
      element: (
        <ProtectedRoute>
          <PromoCodesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/promo-usage",
      element: (
        <ProtectedRoute>
          <PromoUsagePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/notifications",
      element: (
        <ProtectedRoute>
          <NotificationsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/subscriptions",
      element: (
        <ProtectedRoute>
          <SubscriptionsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/subscriber-list",
      element: (
        <ProtectedRoute>
          <SubscriberListPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/email",
      element: (
        <ProtectedRoute>
          <EmailPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/system-settings",
      element: (
        <ProtectedRoute>
          <SystemSettingsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/faqs",
      element: (
        <ProtectedRoute>
          <FAQsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/system-users",
      element: (
        <ProtectedRoute>
          <SystemUsersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/database-backup",
      element: (
        <ProtectedRoute>
          <DatabaseBackupPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/google-success",
      element: <GoogleSuccess />,
    },
  ]);

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f6f7fb]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0d6efd]"></div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
