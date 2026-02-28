import React, { useState } from "react";
import {
  Home,
  Users,
  CreditCard,
  FileText,
  DollarSign,
  ClipboardList,
  Layers,
  Grid,
  ChevronDown,
  Image,
  Settings,
  HelpCircle,
  Database,
  Tag,
  Mail,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/hirehand-rmbg.png";

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  // only ONE dropdown open - default to empty
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside
      className={`bg-white border-r border-[#e9ecef] h-screen transition-all duration-300
      ${isOpen ? "w-[260px]" : "w-[70px]"}`}
    >
      {/* LOGO */}
      <div className="px-6 py-5 border-b border-[#f1f1f1] flex items-center justify-center gap-3">
        <img
          src={logo}
          className="h-10 w-10 scale-150 object-contain"
          alt="logo"
        />

        {isOpen && (
          <span className="text-lg font-semibold tracking-wide text-gray-800">
            Hire Hand
          </span>
        )}
      </div>

      {/* MENU */}
      <div className="sidebar-scroll px-3  text-[15px] text-[#6c757d] overflow-y-auto h-[calc(100vh-90px)]">
        <MenuItem
          icon={<Home size={18} />}
          label="Dashboard"
          isOpen={isOpen}
          onClick={() => handleNavigation("/")}
          isActive={location.pathname === "/"}
        />

        {isOpen && section("Provider Management")}

        <Dropdown
          icon={<Users size={18} />}
          label="Providers"
          menu="providers"
          openMenu={openMenu}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isAnySubitemActive={
            location.pathname === "/providers-list"
            // location.pathname === "/providers/add" ||
            // location.pathname === "/providers/bulk-update"
          }
        >
          <SubItem
            text="Provider List"
            onClick={() => handleNavigation("/providers-list")}
            isActive={location.pathname === "/providers-list"}
          />
          {/* <SubItem
            text="Add New Providers"
            onClick={() => handleNavigation("/providers/add")}
            isActive={location.pathname === "/providers/add"}
          /> */}
          {/* <SubItem
            text="Bulk Provider Update"
            onClick={() => handleNavigation("/providers/bulk-update")}
            isActive={location.pathname === "/providers/bulk-update"}
            muted
          /> */}
        </Dropdown>

        <MenuItem
          icon={<CreditCard size={18} />}
          label="Payment Request"
          isOpen={isOpen}
          onClick={() => handleNavigation("/payment-request")}
          isActive={location.pathname === "/payment-request"}
        />

        <Dropdown
          icon={<FileText size={18} />}
          label="Settlements"
          menu="settlements"
          openMenu={openMenu}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isAnySubitemActive={
            location.pathname === "/settlements" ||
            location.pathname === "/settlement-history"
          }
        >
          <SubItem
            text="Settlements"
            onClick={() => handleNavigation("/settlements")}
            isActive={location.pathname === "/settlements"}
          />
          <SubItem
            text="Settlement History"
            onClick={() => handleNavigation("/settlement-history")}
            isActive={location.pathname === "/settlement-history"}
          />
        </Dropdown>

        <Dropdown
          icon={<DollarSign size={18} />}
          label="Cash Collection"
          menu="cash"
          openMenu={openMenu}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isAnySubitemActive={
            location.pathname === "/cash-collection" ||
            location.pathname === "/cash-collection-list"
          }
        >
          <SubItem
            text="Cash Collection"
            onClick={() => handleNavigation("/cash-collection")}
            isActive={location.pathname === "/cash-collection"}
          />
          <SubItem
            text="Cash Collection List"
            onClick={() => handleNavigation("/cash-collection-list")}
            isActive={location.pathname === "/cash-collection-list"}
          />
        </Dropdown>

        {isOpen && section("Booking Management")}

        <MenuItem
          icon={<ClipboardList size={18} />}
          label="Bookings"
          isOpen={isOpen}
          onClick={() => handleNavigation("/bookings")}
          isActive={location.pathname === "/bookings"}
        />
        <MenuItem
          icon={<DollarSign size={18} />}
          label="Booking's Payment"
          isOpen={isOpen}
          onClick={() => handleNavigation("/booking-payment")}
          isActive={location.pathname === "/booking-payment"}
        />
        <MenuItem
          icon={<Layers size={18} />}
          label="Custom Job Requests"
          isOpen={isOpen}
          onClick={() => handleNavigation("/custom-jobs")}
          isActive={location.pathname === "/custom-jobs"}
        />

        {isOpen && section("Service Management")}

        <Dropdown
          icon={<Grid size={18} />}
          label="Service"
          menu="service"
          openMenu={openMenu}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isAnySubitemActive={
            location.pathname === "/services" ||
            location.pathname === "/services/add" ||
            location.pathname === "/services/bulk-update"
          }
        >
          <SubItem
            text="Service List"
            onClick={() => handleNavigation("/services")}
            isActive={location.pathname === "/services"}
          />
          {/* <SubItem
            text="Add New Service"
            onClick={() => handleNavigation("/services/add")}
            isActive={location.pathname === "/services/add"}
          />
          <SubItem
            text="Bulk Service Update"
            onClick={() => handleNavigation("/services/bulk-update")}
            isActive={location.pathname === "/services/bulk-update"}
            muted
          /> */}
        </Dropdown>

        <MenuItem
          icon={<Layers size={18} />}
          label="Service Categories"
          isOpen={isOpen}
          onClick={() => handleNavigation("/service-categories")}
          isActive={location.pathname === "/service-categories"}
        />

        {isOpen && section("Home Screen Management")}
        <MenuItem
          icon={<Image size={18} />}
          label="Sliders"
          isOpen={isOpen}
          onClick={() => handleNavigation("/sliders")}
          isActive={location.pathname === "/sliders"}
        />
        <MenuItem
          icon={<Image size={18} />}
          label="Coupons"
          isOpen={isOpen}
          onClick={() => handleNavigation("/coupons")}
          isActive={location.pathname === "/coupons"}
        />

        {isOpen && section("Customer Management")}
        <MenuItem
          icon={<Users size={18} />}
          label="Customers"
          isOpen={isOpen}
          onClick={() => handleNavigation("/customers")}
          isActive={location.pathname === "/customers"}
        />
        <MenuItem
          icon={<FileText size={18} />}
          label="Transactions"
          isOpen={isOpen}
          onClick={() => handleNavigation("/transactions")}
          isActive={location.pathname === "/transactions"}
        />
        <MenuItem
          icon={<DollarSign size={18} />}
          label="Payment Refunds"
          isOpen={isOpen}
          onClick={() => handleNavigation("/payment-refunds")}
          isActive={location.pathname === "/payment-refunds"}
        />
        <MenuItem
          icon={<Home size={18} />}
          label="Addresses"
          isOpen={isOpen}
          onClick={() => handleNavigation("/addresses")}
          isActive={location.pathname === "/addresses"}
        />

        {isOpen && section("Support Management")}
        <MenuItem
          icon={<HelpCircle size={18} />}
          label="User Queries"
          isOpen={isOpen}
          onClick={() => handleNavigation("/user-queries")}
          isActive={location.pathname === "/user-queries"}
        />
        <MenuItem
          icon={<ClipboardList size={18} />}
          label="Chat"
          isOpen={isOpen}
        />

        {isOpen && section("Promotional Management")}

        <Dropdown
          icon={<Tag size={18} />}
          label="Promo Codes"
          menu="promo"
          openMenu={openMenu}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isAnySubitemActive={
            location.pathname === "/promo-codes" ||
            location.pathname === "/promo-usage"
          }
        >
          <SubItem
            text="Promo Codes"
            onClick={() => handleNavigation("/promo-codes")}
            isActive={location.pathname === "/promo-codes"}
          />
          <SubItem
            text="Promo Usage"
            onClick={() => handleNavigation("/promo-usage")}
            isActive={location.pathname === "/promo-usage"}
          />
        </Dropdown>

        <MenuItem
          icon={<Mail size={18} />}
          label="Send Notifications"
          isOpen={isOpen}
          onClick={() => handleNavigation("/notifications")}
          isActive={location.pathname === "/notifications"}
        />
        <MenuItem
          icon={<Mail size={18} />}
          label="Send Email"
          isOpen={isOpen}
          onClick={() => handleNavigation("/email")}
          isActive={location.pathname === "/email"}
        />

        {isOpen && section("Subscriptions Management")}

        <Dropdown
          icon={<Settings size={18} />}
          label="Subscription"
          menu="subscription"
          openMenu={openMenu}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isAnySubitemActive={
            location.pathname === "/subscriptions" ||
            location.pathname === "/subscriber-list" ||
            location.pathname === "/add-subscription"
          }
        >
          <SubItem
            text="List Subscription"
            onClick={() => handleNavigation("/subscriptions")}
            isActive={location.pathname === "/subscriptions"}
          />

          {/* <SubItem
            text="Subscriber List"
            onClick={() => handleNavigation("/subscriber-list")}
            isActive={location.pathname === "/subscriber-list"}
          /> */}

          <SubItem
            text="Add Subscription"
            onClick={() => handleNavigation("/add-subscription")}
            isActive={location.pathname === "/add-subscription"}
          />
        </Dropdown>

        {isOpen && section("System Management")}
        <MenuItem
          icon={<Settings size={18} />}
          label="System Settings"
          isOpen={isOpen}
          onClick={() => handleNavigation("/system-settings")}
          isActive={location.pathname === "/system-settings"}
        />
      </div>
    </aside>
  );
}

/* ===== helpers ===== */

const section = (title) => (
  <p className="text-[11px] text-gray-400 uppercase px-4 mt-6 mb-2">{title}</p>
);

function MenuItem({ icon, label, isOpen, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded cursor-pointer transition ${
        isActive ? "bg-[#f1f6ff] text-[#0d6efd]" : "hover:bg-[#f8f9fa]"
      }`}
    >
      {icon}
      {isOpen && label}
    </div>
  );
}

function Dropdown({
  icon,
  label,
  menu,
  openMenu,
  toggleMenu,
  isOpen,
  children,
  isAnySubitemActive,
}) {
  const active = openMenu === menu;
  const shouldHighlight = active || isAnySubitemActive;
  // Show children if dropdown is explicitly opened OR if any sub-item is active in URL
  const shouldShowChildren = (active || isAnySubitemActive) && isOpen;

  return (
    <>
      <div
        onClick={() => toggleMenu(menu)}
        className={`relative px-4 py-3 rounded cursor-pointer
        ${shouldHighlight ? "bg-[#f1f6ff] text-[#0d6efd]" : "hover:bg-[#f8f9fa]"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            {isOpen && label}
          </div>

          {isOpen && (
            <ChevronDown
              size={16}
              className={`transition ${active || isAnySubitemActive ? "rotate-180" : ""}`}
            />
          )}
        </div>

        {shouldHighlight && isOpen && (
          <span className="absolute right-0 top-0 h-full w-0.75 bg-[#0d6efd]" />
        )}
      </div>

      {shouldShowChildren && (
        <div className="ml-8 mt-2 space-y-2 text-[14px]">{children}</div>
      )}
    </>
  );
}

function SubItem({ text, muted, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer py-1 px-2 rounded transition ${
        isActive
          ? "bg-[#f1f6ff] text-[#0d6efd] font-medium"
          : muted
            ? "text-gray-400"
            : "hover:bg-[#f8f9fa]"
      }`}
    >
      - {text}
    </div>
  );
}
