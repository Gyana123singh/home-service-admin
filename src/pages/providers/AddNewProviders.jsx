import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";

export default function AddNewProvidersPage() {
  const [tab, setTab] = useState("en");
  const [approved, setApproved] = useState(true);
  const [store, setStore] = useState(true);
  const [doorstep, setDoorstep] = useState(true);
  const [postChat, setPostChat] = useState(true);
  const [preChat, setPreChat] = useState(false);
  const [needApproval, setNeedApproval] = useState(false);

  return (
    <AdminLayout>
      <div className="pb-5 bg-[#f6f7fb] min-h-screen">
        {/* CARD */}
        <div className="bg-white rounded-xl border border-gray-300">
          {/* HEADER */}
          <div className="px-6 py-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold">Provider Information</h2>
          </div>

          {/* LANGUAGE TABS */}
          <div className="px-6 pt-4 flex gap-8 border-b border-gray-300 text-sm">
            <Tab
              active={tab === "en"}
              onClick={() => setTab("en")}
              label="English(Default)"
            />
            <Tab
              active={tab === "hi"}
              onClick={() => setTab("hi")}
              label="Hindi"
            />
            <Tab
              active={tab === "ar"}
              onClick={() => setTab("ar")}
              label="Arabic"
            />
          </div>

          {/* FORM */}
          <div className="p-6">
            {/* NAME + COMPANY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Name (EN)"
                required
                placeholder="Enter Name Here"
              />

              <FormInput
                label="Company Name (EN)"
                required
                placeholder="Enter Company Name Here"
              />
            </div>

            {/* ABOUT PROVIDER */}
            <div className="mt-6">
              <FormTextarea
                label="About Provider (EN)"
                required
                placeholder="Enter About Provider Here"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Description (EN) <span className="text-red-500">*</span>
              </label>

              <div className="border border-gray-300 rounded-md">
                {/* TOOLBAR */}
                <div className="border-b border-gray-300 px-3 py-2 flex flex-wrap gap-4 text-sm text-gray-600 bg-[#fafafa]">
                  <span>File</span>
                  <span>Edit</span>
                  <span>View</span>
                  <span>Insert</span>
                  <span>Format</span>
                  <span>Tools</span>
                  <span>Table</span>
                  <span>Help</span>
                </div>

                {/* ICON BAR */}
                <div className="border-b border-gray-300 px-3 py-2 flex flex-wrap gap-4 text-gray-700 text-sm">
                  <button>B</button>
                  <button className="italic">I</button>
                  <button>U</button>
                  <button>≡</button>
                  <button>≣</button>
                  <button>⋮</button>
                  <button>¶</button>
                  <button>?</button>
                </div>

                {/* TEXT AREA */}
                <textarea className="w-full min-h-[220px] p-4 outline-none text-sm focus:border-[#0d6efd]" />

                {/* FOOTER */}
                <div className="flex justify-between px-3 py-2 text-xs text-gray-400 border-t border-gray-300">
                  <span>P</span>
                  <span>0 WORDS &nbsp; POWERED BY TINY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-12 xl:col-span-8 bg-white rounded-xl border border-gray-300">
          {/* HEADER */}
          <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Other Information</h2>

            <Toggle label="Approved" value={approved} onChange={setApproved} />
          </div>

          {/* FORM */}
          <div className="p-6 space-y-6">
            {/* SLUG + TYPE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Slug" required placeholder="Enter the slug" />
              <Select label="Type" required />
            </div>

            <p className="text-sm text-gray-500 flex gap-2 items-center">
              ℹ️ The slug must always be in English for better SEO and URL
              compatibility.
            </p>

            {/* VISITING + ADVANCE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Visiting Charges ($)"
                required
                placeholder="Enter Visiting Charges Here"
              />
              <Input
                label="Advance Booking Days"
                required
                placeholder="Enter Advance Booking Days Here"
              />
            </div>

            {/* MEMBERS */}
            <Input
              label="Number Of Members"
              required
              placeholder="Enter Number Of Members Here"
            />

            {/* SWITCH ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Toggle label="At Store" value={store} onChange={setStore} />
              <Toggle
                label="At Doorstep"
                value={doorstep}
                onChange={setDoorstep}
              />
              <Toggle
                label="Allow Post Booking Chat"
                value={postChat}
                onChange={setPostChat}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Toggle
                label="Allow Pre Booking Chat"
                value={preChat}
                onChange={setPreChat}
                danger
              />
              <Toggle
                label="Need approval for the service"
                value={needApproval}
                onChange={setNeedApproval}
                danger
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — IMAGES */}
        <div className="col-span-12 xl:col-span-4 bg-white rounded-xl border border-gray-300">
          <div className="px-6 py-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold">Images</h2>
          </div>

          <div className="p-6 space-y-6">
            <Upload label="Image" note="We recommend 80×80 pixels" />

            <Upload label="Banner Image" note="We recommend 378×190 pixels" />

            <Upload label="Other Image" note="We recommend 960 × 540 pixels" />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= COMPONENTS ================= */

function Input({ label, placeholder, required }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        placeholder={placeholder}
        className="
          w-full px-4 py-2.5 rounded-md
          border border-gray-300
          outline-none
          focus:border-[#0d6efd]
        "
      />
    </div>
  );
}

function Select({ label, required }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        className="
          w-full px-4 py-2.5 rounded-md
          border border-gray-300
          outline-none
          focus:border-[#0d6efd]
        "
      >
        <option>Select Type</option>
      </select>
    </div>
  );
}

function Toggle({ label, value, onChange, danger }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>

      <button
        onClick={() => onChange(!value)}
        className={`
          relative w-[90px] h-[34px] rounded-full transition
          ${value ? (danger ? "bg-red-500" : "bg-green-500") : "bg-gray-300"}
        `}
      >
        <span
          className={`
            absolute top-[3px] w-[28px] h-[28px] bg-white rounded-full transition
            ${value ? "right-[3px]" : "left-[3px]"}
          `}
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
          {value ? "Active" : "Deactivate"}
        </span>
      </button>
    </div>
  );
}

function Upload({ label, note }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label} <span className="text-red-500">*</span>{" "}
        <span className="text-gray-400 font-normal">({note})</span>
      </label>

      <div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500 bg-[#f5f5f7]">
        Drag & Drop files here or{" "}
        <span className="text-[#0d6efd] cursor-pointer underline">
          Browse Files
        </span>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 border-b-2 transition text-sm
        ${
          active
            ? "border-[#0d6efd] text-[#0d6efd] font-medium"
            : "border-transparent text-gray-400"
        }`}
    >
      {label}
    </button>
  );
}

function FormInput({ label, required, placeholder }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        placeholder={placeholder}
        className="
          w-full px-4 py-2.5 rounded-md
          border border-gray-300
          outline-none
          focus:border-[#0d6efd]
        "
      />
    </div>
  );
}

function FormTextarea({ label, required, placeholder }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <textarea
        placeholder={placeholder}
        className="
          w-full px-4 py-3 min-h-[120px] rounded-md
          border border-gray-300
          outline-none
          focus:border-[#0d6efd]
        "
      />
    </div>
  );
}
