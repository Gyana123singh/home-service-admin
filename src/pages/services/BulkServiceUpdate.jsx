import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Download,
  Upload,
  FileText,
  Layers,
  FileUp,
} from "lucide-react";

export default function BulkServiceUpdatePage() {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f5f7fb] min-h-screen">

        {/* ===== Header ===== */}
        <div className="bg-white rounded-lg p-5 mb-6 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            Bulk Service Update
          </h2>

          <div className="text-sm text-gray-500">
            Dashboard / <span className="text-blue-600">Bulk Service Update</span>
          </div>
        </div>

        {/* ===== Steps ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-600">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-blue-600 font-semibold">Step 1</h4>
              <Download className="text-blue-600" />
            </div>

            <h3 className="font-semibold mb-3">Download Excel File</h3>

            <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
              <li>Download the format file and fill it with proper data.</li>
              <li>
                Download and review the example file to understand the required
                structure and format.
              </li>
              <li>Have to upload excel file.</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-600">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-blue-600 font-semibold">Step 2</h4>
              <Layers className="text-blue-600" />
            </div>

            <h3 className="font-semibold mb-3">
              Match Spread sheet data according to instruction
            </h3>

            <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
              <li>
                Ensure that all data in the spreadsheet adheres to the specified
                formats and values.
              </li>
              <li>
                Download and review the example file to understand the required
                structure and format.
              </li>
              <li>Upload an Excel file (.xlsx) for the bulk import process.</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-600">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-blue-600 font-semibold">Step 3</h4>
              <Upload className="text-blue-600" />
            </div>

            <h3 className="font-semibold mb-3">
              Have to upload excel file.
            </h3>

            <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
              <li>
                Ensure the first row contains the correct headers matching the
                template.
              </li>
              <li>
                Review and validate your data thoroughly before uploading.
              </li>
              <li>
                Ensure all mandatory fields are filled properly.
              </li>
              <li>Have to upload excel file.</li>
            </ul>
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Download Files */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-blue-600 font-semibold mb-6">
              Download Files
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <button className="border border-blue-600 text-blue-600 px-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-50">
                <FileText size={16} />
                Add Service Data
              </button>

              <button className="border border-blue-600 text-blue-600 px-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-50">
                <FileText size={16} />
                Add Service Instructions
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="border border-blue-600 text-blue-600 px-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-50">
                <FileText size={16} />
                Update Service Instructions
              </button>

              <select className="border rounded-md px-4 py-3">
                <option>Select Provider(s)</option>
                <option>Provider 1</option>
                <option>Provider 2</option>
              </select>

              <button className="border border-blue-600 text-blue-600 px-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-50">
                <FileText size={16} />
                Update Service Data
              </button>
            </div>
          </div>

          {/* Upload */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-blue-600 font-semibold mb-6">
              Upload File
            </h3>

            <div className="border-2 border-dashed rounded-md p-6 text-center text-gray-500 bg-gray-50 mb-4">
              Drag & Drop files here or{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Browse Files
              </span>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md">
              Submit
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
