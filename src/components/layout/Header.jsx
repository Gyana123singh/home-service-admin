import { Menu, Search, ChevronDown } from "lucide-react";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="h-[70px] bg-white border-b border-[#e9ecef] flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4 flex-1">

        {/* SIDEBAR TOGGLE */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-[#0d6efd] hover:bg-[#f1f6ff] p-2 rounded-md"
        >
          <Menu size={22} />
        </button>

        {/* DEMO */}
        <span className="bg-[#ff5b5b] text-white text-sm px-4 py-1 rounded-full">
          Demo mode
        </span>

        {/* VERSION */}
        <span className="bg-[#0d6efd] text-white text-sm px-4 py-1 rounded-full">
          4.5.0
        </span>

        {/* SEARCH */}
        <div className="flex items-center border border-[#dee2e6] rounded-md overflow-hidden ml-4 w-[360px]">
          <input
            placeholder="Search"
            className="px-4 py-2 w-full outline-none text-sm"
          />
          <button className="bg-white px-4 border-l">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* LANGUAGE */}
        <button className="bg-[#0d6efd] text-white px-4 py-2 rounded-md flex items-center gap-2">
          EN <ChevronDown size={14} />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-2 bg-[#0d6efd] text-white px-4 py-2 rounded-full cursor-pointer">
          <div className="w-7 h-7 bg-white text-[#0d6efd] rounded-full flex items-center justify-center text-sm font-bold">
            W
          </div>
          <span className="text-sm">Hi, Wrteam</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
}
