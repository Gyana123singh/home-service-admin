import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Search,
  Home,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
} from "lucide-react";
import { providersApi } from "../../api/providers/providersApi";

export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | approved | rejected
  const [search, setSearch] = useState("");
  const [rejectModal, setRejectModal] = useState(false);
  const [docsModal, setDocsModal] = useState(false); // ✅ NEW
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProviders(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchProviders = async (status = "all") => {
    try {
      setLoading(true);
      const res = await providersApi.getAll(status);
      setProviders(res.data.data || []);
    } catch (err) {
      console.error("Fetch providers error:", err);
      alert("Failed to load providers");
    } finally {
      setLoading(false);
    }
  };

  const approveVendor = async (vendorId) => {
    if (!window.confirm("Approve this vendor?")) return;
    try {
      await providersApi.approve(vendorId);
      alert("Vendor approved successfully");
      fetchProviders(filter);
    } catch (err) {
      console.error(err);
      alert("Failed to approve vendor");
    }
  };

  const rejectVendor = async () => {
    if (!selectedVendor) return;
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason");
      return;
    }
    try {
      await providersApi.reject(selectedVendor._id, rejectReason);
      alert("Vendor rejected successfully");
      setRejectModal(false);
      setRejectReason("");
      setSelectedVendor(null);
      fetchProviders(filter);
    } catch (err) {
      console.error(err);
      alert("Failed to reject vendor");
    }
  };

  const filteredProviders = providers.filter((p) => {
    const q = search.toLowerCase();
    const name = `${p.firstName || ""} ${p.lastName || ""}`.toLowerCase();
    const email = (p.email || "").toLowerCase();
    const phone = (p.phone || "").toLowerCase();
    return name.includes(q) || email.includes(q) || phone.includes(q);
  });

  const statusBadge = (status) => {
    if (status === "approved")
      return (
        <span className="px-3 py-1 text-xs rounded bg-green-100 text-green-600">
          Approved
        </span>
      );
    if (status === "rejected")
      return (
        <span className="px-3 py-1 text-xs rounded bg-red-100 text-red-600">
          Rejected
        </span>
      );
    return (
      <span className="px-3 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
        Pending
      </span>
    );
  };

  const getProfileImage = (p) => {
    return (
      p.selfieImage ||
      p.documents?.selfieImage ||
      p.documents?.passportPhoto ||
      ""
    );
  };

  const renderDocuments = (vendor) => {
    if (!vendor?.documents || Object.keys(vendor.documents).length === 0) {
      return <p className="text-gray-500">No documents uploaded.</p>;
    }

    const labels = {
      selfieImage: "Selfie",
      aadhaarImage: "Aadhaar",
      panImage: "PAN",
      companyCertificate: "Company Certificate",
    };

    return Object.entries(labels).map(([key, label]) => {
      const url = vendor.documents[key];
      if (!url) return null;

      return (
        <div key={key} className="mb-4">
          <p className="font-medium mb-1">{label}</p>
          <img src={url} alt={label} className="w-full border rounded" />
        </div>
      );
    });
  };
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">
        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-lg px-6 py-4 flex justify-between items-center border">
          <h2 className="text-xl font-semibold text-[#2c3e50]">
            Providers Approval
          </h2>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Home size={16} className="text-[#0d6efd]" />
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#0d6efd] font-medium">Providers</span>
          </div>
        </div>

        {/* ================= FILTER BAR (RESTORED) ================= */}
        <div className="bg-white rounded-lg border mt-6 p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-5 py-2 rounded border ${
                  filter === "all"
                    ? "bg-[#eaf3ff] text-[#0d6efd] border-[#0d6efd]"
                    : "border-gray-300"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFilter("pending")}
                className="px-5 py-2 rounded border border-yellow-400 text-yellow-700 bg-yellow-50 flex gap-2 items-center"
              >
                <Clock size={16} /> Pending
              </button>

              <button
                onClick={() => setFilter("approved")}
                className="px-5 py-2 rounded border border-green-400 text-green-600 bg-green-50 flex gap-2 items-center"
              >
                <CheckCircle size={16} /> Approved
              </button>

              <button
                onClick={() => setFilter("rejected")}
                className="px-5 py-2 rounded border border-red-400 text-red-500 bg-red-50 flex gap-2 items-center"
              >
                <XCircle size={16} /> Rejected
              </button>

              {/* SEARCH */}
              <div className="flex border rounded overflow-hidden ml-3">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search here!"
                  className="px-4 py-2 outline-none w-[260px]"
                />
                <button className="bg-[#0d6efd] px-4 text-white">
                  <Search size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* ================= TABLE ================= */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-[#f3f5f8] text-gray-600">
                <tr>
                  <th className="p-3 text-left">Profile</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-center">Mobile</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {!loading &&
                  filteredProviders.map((p) => {
                    const img = getProfileImage(p);

                    return (
                      <tr key={p._id} className="border-b hover:bg-[#f9fbff]">
                        {/* PROFILE */}
                        <td className="p-4 flex gap-3 items-center">
                          <div className="w-12 h-12 border rounded overflow-hidden flex items-center justify-center bg-gray-100">
                            {img ? (
                              <img
                                src={img}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-400 text-xs">
                                NO IMAGE
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {(p.firstName || "") + " " + (p.lastName || "")}
                            </p>
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td className="text-left">{p.email || "-"}</td>

                        {/* MOBILE */}
                        <td className="text-center">{p.phone || "-"}</td>

                        {/* STATUS */}
                        <td className="text-center">
                          {statusBadge(p.vendorStatus)}
                        </td>

                        {/* ACTIONS */}
                        <td className="text-center">
                          <div className="flex justify-center gap-2 py-3">
                            {/* ✅ VIEW DOCS */}
                            <button
                              onClick={() => {
                                setSelectedVendor(p);
                                setDocsModal(true);
                              }}
                              className="px-3 py-1 text-xs bg-blue-500 text-white rounded flex items-center gap-1"
                            >
                              <FileText size={14} /> Docs
                            </button>

                            {p.vendorStatus === "pending" && (
                              <>
                                <button
                                  onClick={() => approveVendor(p._id)}
                                  className="px-3 py-1 text-xs bg-green-500 text-white rounded"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedVendor(p);
                                    setRejectModal(true);
                                  }}
                                  className="px-3 py-1 text-xs bg-red-500 text-white rounded"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            <button
                              onClick={() => {
                                if (p.vendorStatus === "rejected") {
                                  alert(
                                    `Status: Rejected\nReason: ${
                                      p.rejectionReason || "Not provided"
                                    }`,
                                  );
                                } else {
                                  alert(`Status: ${p.vendorStatus}`);
                                }
                              }}
                              className="px-3 py-1 text-xs border rounded flex items-center gap-1"
                            >
                              <Eye size={14} /> Audit
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= DOCUMENT MODAL ================= */}
        {docsModal && selectedVendor && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[700px] p-6 max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Vendor Documents</h3>

              {[
                "selfieImage",
                "aadhaarImage",
                "panImage",
                "companyCertificate",
              ].map((key) => {
                const url = selectedVendor.documents?.[key];
                if (!url) return null;
                return (
                  <div key={key} className="mb-4">
                    <p className="font-medium mb-1">{key}</p>
                    <img
                      src={url}
                      alt={key}
                      className="w-full border rounded"
                    />
                  </div>
                );
              })}

              <div className="text-right">
                <button
                  onClick={() => setDocsModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= REJECT MODAL (UNCHANGED) ================= */}
        {rejectModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[400px] p-6">
              <h3 className="text-lg font-semibold mb-3">Reject Vendor</h3>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full border rounded p-3 outline-none"
                rows={4}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setRejectModal(false);
                    setRejectReason("");
                    setSelectedVendor(null);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={rejectVendor}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
