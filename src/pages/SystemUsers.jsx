import React from "react";
import AdminLayout from "../components/layout/AdminLayout";

export default function SystemUsersPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">System Users</h1>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e9ecef]">
          <p className="text-gray-500">System Users management page</p>
        </div>
      </div>
    </AdminLayout>
  );
}
