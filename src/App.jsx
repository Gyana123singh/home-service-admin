import { useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks";
import ScrollRestoration from "./components/ScrollToTop";
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
import FeaturedSectionPage from "./pages/featuredSection/FeaturedSection";
import CustomersPage from "./pages/Customers";
import ReviewsRatingsPage from "./pages/reviewsRatings/ReviewsRatings";
import SupportTicketsPage from "./pages/SupportTickets";
import PromoCodesPage from "./pages/PromoCodes";
import PromoUsagePage from "./pages/PromoUsage";
import NotificationsPage from "./pages/Notifications";
import EmailPage from "./pages/Email";
import SystemSettingsPage from "./pages/SystemSettings";
import FAQsPage from "./pages/FAQs";
import SystemUsersPage from "./pages/SystemUsers";
import DatabaseBackupPage from "./pages/DatabaseBackup";

function App() {
  const { isLoggedIn } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: isLoggedIn ? <DashboardPage /> : <LoginPage />,
    },
    {
      path: "/providers-list",
      element: <ProvidersPage />,
    },
    {
      path: "/providers/add",
      element: <AddNewProvidersPage />,
    },
    {
      path: "/providers/bulk-update",
      element: <BulkProviderUpdatePage />,
    },
    {
      path: "/payment-request",
      element: <PaymentRequestPage />,
    },
    {
      path: "/settlements",
      element: <SettlementsPage />,
    },
    {
      path: "/settlement-history",
      element: <SettlementHistoryPage />,
    },
    {
      path: "/cash-collection",
      element: <CashCollectionPage />,
    },
    {
      path: "/cash-collection-list",
      element: <CashCollectionListPage />,
    },
    {
      path: "/bookings",
      element: <BookingsPage />,
    },
    {
      path: "/booking-payment",
      element: <BookingPaymentPage />,
    },
    {
      path: "/custom-jobs",
      element: <CustomJobRequestsPage />,
    },
    {
      path: "/services",
      element: <ServicesPage />,
    },
    {
      path: "/services/add",
      element: <AddNewServicePage />,
    },
    {
      path: "/services/bulk-update",
      element: <BulkServiceUpdatePage />,
    },
    {
      path: "/service-categories",
      element: <ServiceCategoriesPage />,
    },
    {
      path: "/sliders",
      element: <SlidersPage />,
    },
    {
      path: "/featured-section",
      element: <FeaturedSectionPage />,
    },
    {
      path: "/customers",
      element: <CustomersPage />,
    },
    {
      path: "/reviews",
      element: <ReviewsRatingsPage />,
    },
    {
      path: "/support-tickets",
      element: <SupportTicketsPage />,
    },
    {
      path: "/promo-codes",
      element: <PromoCodesPage />,
    },
    {
      path: "/promo-usage",
      element: <PromoUsagePage />,
    },
    {
      path: "/notifications",
      element: <NotificationsPage />,
    },
    {
      path: "/email",
      element: <EmailPage />,
    },
    {
      path: "/system-settings",
      element: <SystemSettingsPage />,
    },
    {
      path: "/faqs",
      element: <FAQsPage />,
    },
    {
      path: "/system-users",
      element: <SystemUsersPage />,
    },
    {
      path: "/database-backup",
      element: <DatabaseBackupPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
