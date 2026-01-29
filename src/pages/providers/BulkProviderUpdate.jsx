import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Download, Upload, FileSpreadsheet } from "lucide-react";

export default function BulkProviderUpdatePage() {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">

        {/* PAGE HEADER */}
        <div className="bg-white rounded-xl border border-gray-300 px-6 py-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Bulk Provider Update</h2>

          <p className="text-sm text-gray-500">
            🏠 Dashboard / Bulk Provider Update
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <StepCard
            step="Step 1"
            title="Download Excel File"
            icon={<Download size={26} />}
            points={[
              "Download the format file and fill it with proper data.",
              "Download the example file to understand how the data must be filled.",
              "Have to upload excel file.",
            ]}
          />

          <StepCard
            step="Step 2"
            title="Match Spread sheet data according to instruction"
            icon={<FileSpreadsheet size={26} />}
            points={[
              "Ensure that all data in the spreadsheet adheres to the specified formats and values.",
              "Download and review the example file to understand the required structure and format.",
              "Upload an Excel file (.xlsx) for the bulk import process.",
            ]}
          />

          <StepCard
            step="Step 3"
            title="Have to upload excel file."
            icon={<Upload size={26} />}
            points={[
              "Ensure the first row contains the correct headers matching the template.",
              "Review and validate your data thoroughly before uploading.",
              "Ensure all mandatory fields are filled and follow formats strictly.",
              "Have to upload excel file.",
            ]}
          />
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* DOWNLOAD FILES */}
          <div className="bg-white rounded-xl border border-gray-300 p-6">
            <h3 className="font-semibold text-[#0d6efd] mb-6">
              Download Files
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DownloadBtn text="Add Provider Data" />
              <DownloadBtn text="Update Provider Data" />
              <DownloadBtn text="Add Provider Instructions" />
              <DownloadBtn text="Update Provider Instructions" />
            </div>
          </div>

          {/* UPLOAD FILE */}
          <div className="bg-white rounded-xl border border-gray-300 p-6">
            <h3 className="font-semibold text-[#0d6efd] mb-6">
              Upload File
            </h3>

            <div className="border border-dashed border-gray-300 rounded-lg p-10 text-center bg-[#f5f5f7] mb-6">
              Drag & Drop files here or{" "}
              <span className="text-[#0d6efd] underline cursor-pointer">
                Browse Files
              </span>
            </div>

            <div className="flex justify-end">
              <button className="bg-[#0d6efd] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= COMPONENTS ================= */

function StepCard({ step, title, icon, points }) {
  return (
    <div className="bg-white rounded-xl border border-gray-300 p-6 relative">

      <div className="flex justify-between items-center mb-4">
        <span className="text-[#0d6efd] font-semibold">
          {step}
        </span>

        <div className="text-[#0d6efd] border border-[#0d6efd] rounded-lg p-2">
          {icon}
        </div>
      </div>

      <h4 className="font-semibold mb-4">{title}</h4>

      <ul className="space-y-3 text-sm text-gray-600 list-disc pl-5">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function DownloadBtn({ text }) {
  return (
    <button className="border border-[#0d6efd] text-[#0d6efd] rounded-md py-2 px-4 flex items-center justify-center gap-2 hover:bg-[#0d6efd] hover:text-white transition">
      <Download size={16} />
      {text}
    </button>
  );
}
