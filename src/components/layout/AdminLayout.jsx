import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { pathname } = useLocation();
  const mainRef = React.useRef(null);
  const scrollPositions = React.useRef({});

  // Save scroll position before navigation
  const saveScrollPosition = () => {
    if (mainRef.current) {
      scrollPositions.current[pathname] = mainRef.current.scrollTop;
    }
  };

  // Restore scroll position after navigation
  useEffect(() => {
    if (mainRef.current) {
      const savedPosition = scrollPositions.current[pathname];
      if (savedPosition !== undefined) {
        mainRef.current.scrollTop = savedPosition;
      } else {
        mainRef.current.scrollTop = 0; // Default to top for new pages
      }
    }
  }, [pathname]);

  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main
          ref={mainRef}
          onScroll={saveScrollPosition}
          className="flex-1 overflow-auto p-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
