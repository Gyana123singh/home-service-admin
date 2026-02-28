import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Search,
  Home,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Plus,
} from "lucide-react";
import couponApi from "../../api/coupon/couponApi"; // <-- make sure this exists

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [filters, setFilters] = useState({ status: "all", search: "" });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    code: "",
    title: "",
    description: "",
    discountType: "percentage",
    discountValue: 0,
    maxDiscount: "",
    minOrderValue: 0,
    applicableCategories: "",
    applicableServices: "",
    usageLimit: 0,
    perUserLimit: 1,
    isFirstOrderOnly: false,
    expiresAt: "",
    status: "active",
  });

  const fetchCoupons = async (customFilters = {}) => {
    try {
      setLoading(true);
      const params = {
        page: 1,
        limit: 50,
        ...(customFilters.search ? { search: customFilters.search } : {}),
      };
      const res = await couponApi.getCoupons(params);
      setCoupons(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons(filters);
  }, [filters.search]);

  const filteredCoupons = coupons.filter((c) => {
    if (filters.status !== "all") {
      const isActive = c.isActive === true;
      if (filters.status === "active" && !isActive) return false;
      if (filters.status === "inactive" && isActive) return false;
    }
    return true;
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = "Code is required";
    if (!formData.discountValue || formData.discountValue <= 0)
      newErrors.discountValue = "Discount value must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon._id);
    setFormData({
      code: coupon.code || "",
      title: coupon.title || "",
      description: coupon.description || "",
      discountType: coupon.discountType || "percentage",
      discountValue: coupon.discountValue || 0,
      maxDiscount: coupon.maxDiscount || "",
      minOrderValue: coupon.minOrderValue || 0,
      applicableCategories: coupon.applicableCategories?.join(", ") || "",
      applicableServices: coupon.applicableServices?.join(", ") || "",
      usageLimit: coupon.usageLimit || 0,
      perUserLimit: coupon.perUserLimit || 1,
      isFirstOrderOnly: coupon.isFirstOrderOnly || false,
      expiresAt: coupon.expiresAt ? coupon.expiresAt.substring(0, 10) : "",
      status: coupon.isActive ? "active" : "inactive",
    });
    setShowDropdown(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      code: "",
      title: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      maxDiscount: "",
      minOrderValue: 0,
      applicableCategories: "",
      applicableServices: "",
      usageLimit: 0,
      perUserLimit: 1,
      isFirstOrderOnly: false,
      expiresAt: "",
      status: "active",
    });
    setErrors({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      setLoading(true);
      await couponApi.deleteCoupon(id);
      await fetchCoupons(filters);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLoading(false);
      setShowDropdown(null);
    }
  };

  const toggleStatus = async (id) => {
    try {
      setLoading(true);
      await couponApi.toggleStatus(id);
      await fetchCoupons(filters);
    } catch (err) {
      console.error("Toggle failed:", err);
    } finally {
      setLoading(false);
      setShowDropdown(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        code: formData.code.toUpperCase(),
        title: formData.title,
        description: formData.description,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        maxDiscount: formData.maxDiscount
          ? Number(formData.maxDiscount)
          : undefined,
        minOrderValue: Number(formData.minOrderValue || 0),
        applicableCategories: formData.applicableCategories
          ? formData.applicableCategories.split(",").map((s) => s.trim())
          : [],
        applicableServices: formData.applicableServices
          ? formData.applicableServices.split(",").map((s) => s.trim())
          : [],
        usageLimit: Number(formData.usageLimit || 0),
        perUserLimit: Number(formData.perUserLimit || 1),
        isFirstOrderOnly: Boolean(formData.isFirstOrderOnly),
        expiresAt: formData.expiresAt
          ? new Date(formData.expiresAt)
          : undefined,
        isActive: formData.status === "active",
      };

      if (editingId) {
        await couponApi.updateCoupon(editingId, payload);
      } else {
        await couponApi.createCoupon(payload);
      }

      await fetchCoupons(filters);
      resetForm();
    } catch (err) {
      console.error("Save failed:", err);
      alert(err.response?.data?.message || "Failed to save coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-3 sm:p-6 bg-[#f6f7fb] min-h-screen">
        {/* HEADER */}
        <div className="bg-white rounded-xl border border-gray-300 px-4 sm:px-6 py-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Coupons</h2>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Home size={16} className="text-blue-600" />
            Dashboard / Coupons
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT FORM */}
          <div className="xl:col-span-4 bg-white rounded-xl border border-gray-300">
            <div className="px-6 py-4 border-b border-gray-300 flex justify-between">
              <h3 className="font-semibold">
                {editingId ? "Edit Coupon" : "Add Coupon"}
              </h3>
              <button
                type="button"
                onClick={() =>
                  handleInputChange(
                    "status",
                    formData.status === "active" ? "inactive" : "active",
                  )
                }
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.status === "active"
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {formData.status === "active" ? "Active" : "Inactive"}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-3">
              <input
                placeholder="Coupon Code (e.g. HIRE50)"
                value={formData.code}
                onChange={(e) =>
                  handleInputChange("code", e.target.value.toUpperCase())
                }
                className="w-full border rounded px-4 py-2"
              />
              {errors.code && (
                <p className="text-red-500 text-xs">{errors.code}</p>
              )}

              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full border rounded px-4 py-2"
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full border rounded px-4 py-2"
              />

              <select
                value={formData.discountType}
                onChange={(e) =>
                  handleInputChange("discountType", e.target.value)
                }
                className="w-full border rounded px-4 py-2"
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </select>

              <input
                type="number"
                placeholder="Discount Value"
                value={formData.discountValue}
                onChange={(e) =>
                  handleInputChange("discountValue", e.target.value)
                }
                className="w-full border rounded px-4 py-2"
              />

              {formData.discountType === "percentage" && (
                <input
                  type="number"
                  placeholder="Max Discount (optional)"
                  value={formData.maxDiscount}
                  onChange={(e) =>
                    handleInputChange("maxDiscount", e.target.value)
                  }
                  className="w-full border rounded px-4 py-2"
                />
              )}

              <input
                type="number"
                placeholder="Min Order Value"
                value={formData.minOrderValue}
                onChange={(e) =>
                  handleInputChange("minOrderValue", e.target.value)
                }
                className="w-full border rounded px-4 py-2"
              />

              <input
                placeholder="Applicable Categories (comma separated)"
                value={formData.applicableCategories}
                onChange={(e) =>
                  handleInputChange("applicableCategories", e.target.value)
                }
                className="w-full border rounded px-4 py-2"
              />

              <input
                placeholder="Applicable Service IDs (comma separated)"
                value={formData.applicableServices}
                onChange={(e) =>
                  handleInputChange("applicableServices", e.target.value)
                }
                className="w-full border rounded px-4 py-2"
              />

              <input
                type="number"
                placeholder="Usage Limit (0 = unlimited)"
                value={formData.usageLimit}
                onChange={(e) =>
                  handleInputChange("usageLimit", e.target.value)
                }
                className="w-full border rounded px-4 py-2"
              />

              <input
                type="number"
                placeholder="Per User Limit"
                value={formData.perUserLimit}
                onChange={(e) =>
                  handleInputChange("perUserLimit", e.target.value)
                }
                className="w-full border rounded px-4 py-2"
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.isFirstOrderOnly}
                  onChange={(e) =>
                    handleInputChange("isFirstOrderOnly", e.target.checked)
                  }
                />
                First Order Only
              </label>

              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => handleInputChange("expiresAt", e.target.value)}
                className="w-full border rounded px-4 py-2"
              />

              <div className="flex justify-end gap-3">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <Plus size={16} />
                  {editingId ? "Update Coupon" : "Add Coupon"}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT TABLE */}
          <div className="xl:col-span-8 bg-white rounded-xl border border-gray-300">
            <div className="p-6 border-b border-gray-300 font-semibold">
              All Coupons
            </div>

            <div className="p-6 overflow-x-auto">
              <div className="flex gap-3 mb-4">
                <input
                  placeholder="Search by code..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((p) => ({ ...p, search: e.target.value }))
                  }
                  className="border px-4 py-2 rounded w-64"
                />
                <button className="bg-blue-600 text-white px-4 rounded">
                  <Search size={18} />
                </button>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f2f2f6] text-gray-600">
                    <th className="p-3 text-left">Code</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Value</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map((c) => (
                    <CouponRow
                      key={c._id}
                      coupon={c}
                      onEdit={() => handleEdit(c)}
                      onDelete={() => handleDelete(c._id)}
                      onToggleStatus={() => toggleStatus(c._id)}
                      showDropdown={showDropdown === c._id}
                      setShowDropdown={setShowDropdown}
                    />
                  ))}
                  {filteredCoupons.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-6 text-center text-gray-500">
                        No coupons found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= ROW ================= */

function CouponRow({
  coupon,
  onEdit,
  onDelete,
  onToggleStatus,
  showDropdown,
  setShowDropdown,
}) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{coupon.code}</td>
      <td className="p-4">{coupon.discountType}</td>
      <td className="p-4">{coupon.discountValue}</td>
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            coupon.isActive
              ? "bg-green-50 text-green-600 border border-green-500"
              : "bg-red-50 text-red-600 border border-red-500"
          }`}
        >
          {coupon.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="p-4">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(showDropdown ? null : coupon._id)}
            className="border p-2 rounded"
          >
            <MoreVertical size={16} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
              <button
                onClick={onEdit}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2"
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={onToggleStatus}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2"
              >
                {coupon.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                {coupon.isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={onDelete}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex gap-2"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
