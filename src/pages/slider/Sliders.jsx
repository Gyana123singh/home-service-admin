import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Search,
  Home,
  MoreVertical,
  Trash2,
  Eye,
  EyeOff,
  Plus,
} from "lucide-react";
import { offerApi } from "../../api/slider/offerApi";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    discountType: "percentage",
    discountValue: "",
    startDate: "",
    endDate: "",
  });

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await offerApi.getAllOffers();
      setOffers(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await offerApi.createGlobalOffer({
        ...formData,
        discountValue: Number(formData.discountValue),
      });

      fetchOffers();

      setFormData({
        title: "",
        discountType: "percentage",
        discountValue: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error creating offer");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await offerApi.toggleOfferStatus(id);
      fetchOffers();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">
        {/* HEADER */}
        <div className="bg-white rounded-xl border px-6 py-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Global Offers</h2>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Home size={16} className="text-blue-600" />
            Dashboard / Offers
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT FORM */}
          <div className="xl:col-span-4 bg-white rounded-xl border p-6">
            <h3 className="font-semibold mb-4">Create Global Offer</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Offer Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full border rounded-md px-4 py-2"
                required
              />

              <select
                value={formData.discountType}
                onChange={(e) => handleChange("discountType", e.target.value)}
                className="w-full border rounded-md px-4 py-2"
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </select>

              <input
                type="number"
                placeholder="Discount Value"
                value={formData.discountValue}
                onChange={(e) => handleChange("discountValue", e.target.value)}
                className="w-full border rounded-md px-4 py-2"
                required
              />

              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full border rounded-md px-4 py-2"
                required
              />

              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="w-full border rounded-md px-4 py-2"
                required
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
                disabled={loading}
              >
                <Plus size={16} />
                Create Offer
              </button>
            </form>
          </div>

          {/* RIGHT TABLE */}
          <div className="xl:col-span-8 bg-white rounded-xl border">
            <div className="px-6 py-4 border-b">
              <h3 className="font-semibold">All Offers</h3>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Discount</th>
                    <th className="p-3 text-left">Duration</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {offers.map((offer) => (
                    <tr key={offer._id} className="border-b">
                      <td className="p-3">{offer.title}</td>

                      <td className="p-3">
                        {offer.discountType === "percentage"
                          ? `${offer.discountValue}% OFF`
                          : `₹${offer.discountValue} OFF`}
                      </td>

                      <td className="p-3">
                        {new Date(offer.startDate).toLocaleDateString()} -{" "}
                        {new Date(offer.endDate).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            offer.status
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {offer.status ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => toggleStatus(offer._id)}
                          className="border px-3 py-1 rounded-md text-sm hover:bg-gray-100"
                        >
                          {offer.status ? (
                            <>
                              <EyeOff size={14} /> Deactivate
                            </>
                          ) : (
                            <>
                              <Eye size={14} /> Activate
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {offers.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No offers created yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
