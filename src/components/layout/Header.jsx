import { useState, useRef, useEffect } from "react";
import { Menu, Search, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const languageRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search functionality
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setLanguageOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setProfileOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <header className="h-[70px] bg-white border-b border-[#e9ecef] flex items-center justify-between px-4 md:px-6 sticky top-0 z-50 shadow-sm">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        {/* SIDEBAR TOGGLE */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-[#0d6efd] hover:bg-[#f1f6ff] p-2 rounded-md transition-colors duration-200 flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>

        {/* SEARCH */}
        <form 
          onSubmit={handleSearch}
          className="hidden sm:flex items-center border border-[#dee2e6] rounded-md overflow-hidden ml-2 w-full max-w-[360px] focus-within:border-[#0d6efd] transition-colors duration-200"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full outline-none text-sm bg-transparent"
          />
          <button 
            type="submit"
            className="bg-white px-3 border-l border-[#dee2e6] hover:bg-gray-50 transition-colors duration-200 h-full flex items-center"
            aria-label="Search"
          >
            <Search size={18} className="text-gray-600" />
          </button>
        </form>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        {/* LANGUAGE SELECTOR */}
        <div className="relative" ref={languageRef}>
          <button 
            onClick={() => setLanguageOpen(!languageOpen)}
            className="bg-[#0d6efd] text-white px-3 md:px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#0b5ed7] transition-colors duration-200 text-sm"
          >
            <span className="hidden sm:inline">{selectedLanguage}</span>
            <span className="sm:hidden">EN</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${languageOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Language Dropdown */}
          {languageOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              {['EN', 'ES', 'FR', 'DE'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    selectedLanguage === lang ? 'bg-[#f1f6ff] text-[#0d6efd] font-medium' : 'text-gray-700'
                  }`}
                >
                  {lang === 'EN' ? 'English' : lang === 'ES' ? 'Español' : lang === 'FR' ? 'Français' : 'Deutsch'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PROFILE DROPDOWN */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 bg-[#0d6efd] text-white px-3 md:px-4 py-2 rounded-full cursor-pointer hover:bg-[#0b5ed7] transition-colors duration-200"
          >
            <div className="w-7 h-7 bg-white text-[#0d6efd] rounded-full flex items-center justify-center text-sm font-bold">
              A
            </div>
            <span className="text-sm hidden md:inline">Hi, Admin</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <User size={16} />
                Profile
              </button>
              
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Settings size={16} />
                Settings
              </button>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
