import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Editor } from "@tinymce/tinymce-react";

export default function AddNewServicePage() {
  const [status, setStatus] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <AdminLayout>
      <div className="p-6 bg-[#f5f7fb] min-h-screen">

        {/* Header */}
        <div className="bg-white rounded-lg p-5 mb-6 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Services</h2>

          <div className="text-sm text-gray-500">
            Dashboard / Service /{" "}
            <span className="text-blue-600">Add Services</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm">

          {/* Card Header */}
          <div className="flex justify-between items-center p-5 border-b">
            <h3 className="text-lg font-semibold">Add Service Details</h3>

            <div className="flex items-center gap-3">
              <span className="text-sm">Status :</span>
              <button
                onClick={() => setStatus(!status)}
                className={`w-14 h-7 rounded-full relative transition ${
                  status ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                    status ? "right-1" : "left-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  status ? "text-green-600" : "text-gray-500"
                }`}
              >
                {status ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">

            {/* Language Tabs */}
            <div className="flex gap-6 border-b mb-6">
              <button
                onClick={() => setLanguage("en")}
                className={`pb-2 ${
                  language === "en"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
              >
                English (Default)
              </button>

              <button
                onClick={() => setLanguage("hi")}
                className="text-gray-400"
              >
                Hindi
              </button>

              <button
                onClick={() => setLanguage("ar")}
                className="text-gray-400"
              >
                Arabic
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-6">

              {/* Title */}
              <div>
                <label className="text-sm font-medium">
                  Title of the service <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-2 w-full border rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium">
                  Tags <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="press enter to add tag"
                  className="mt-2 w-full border rounded-md px-4 py-2 outline-none"
                />
              </div>

              {/* Short description */}
              <div className="col-span-2">
                <label className="text-sm font-medium">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="3"
                  className="mt-2 w-full border rounded-md px-4 py-2 outline-none"
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </label>

                <div className="mt-2">
                  <Editor
                    apiKey="no-api-key"
                    init={{
                      height: 300,
                      menubar: true,
                      plugins:
                        "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                      toolbar:
                        "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image | removeformat | help",
                    }}
                  />
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-8">
              <button className="px-6 py-2 border rounded-md">
                Cancel
              </button>

              <button className="px-6 py-2 bg-blue-600 text-white rounded-md">
                Save Service
              </button>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
