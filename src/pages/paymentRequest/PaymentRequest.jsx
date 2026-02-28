import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { subscriptionApi } from "../../api/payments/paymentsApi";

export default function AdminSubscriptionPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: 30,
    features: "",
    stripePriceId: "",
    isPopular: false,
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ================= LOAD PLANS =================
  const loadPlans = async () => {
    try {
      setLoading(true);
      const res = await subscriptionApi.list();
      setPlans(res.data.data || []);
    } catch (err) {
      console.error("Failed to load plans:", err);
      alert("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  // ================= HANDLE FORM CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      price: Number(form.price),
      duration: Number(form.duration),
      features: form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      stripePriceId: form.stripePriceId,
      isPopular: form.isPopular,
    };

    try {
      if (editingId) {
        await subscriptionApi.update(editingId, payload);
        alert("Plan updated");
      } else {
        await subscriptionApi.create(payload);
        alert("Plan created");
      }

      // Reset & reload
      setForm({
        name: "",
        price: "",
        duration: 30,
        features: "",
        stripePriceId: "",
        isPopular: false,
      });
      setEditingId(null);
      setShowForm(false);
      loadPlans();
    } catch (err) {
      console.error("Save plan error:", err);
      alert(err.response?.data?.message || "Failed to save plan");
    }
  };

  // ================= EDIT =================
  const handleEdit = (plan) => {
    setEditingId(plan._id);
    setForm({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      features: (plan.features || []).join(", "),
      stripePriceId: plan.stripePriceId,
      isPopular: plan.isPopular,
    });
    setShowForm(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await subscriptionApi.remove(id);
      alert("Plan deleted");
      loadPlans();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete plan");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-[#f6f7fb] min-h-screen">

        {/* PAGE HEADER */}
        <div className="bg-white rounded-xl border border-gray-300 px-6 py-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Subscription Plans</h2>

          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setForm({
                name: "",
                price: "",
                duration: 30,
                features: "",
                stripePriceId: "",
                isPopular: false,
              });
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            <Plus size={18} /> Add Plan
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white border border-gray-300 rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-4">
              {editingId ? "Edit Plan" : "Create Plan"}
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Plan Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="duration"
                type="number"
                placeholder="Duration (days)"
                value={form.duration}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                name="stripePriceId"
                placeholder="Stripe Price ID"
                value={form.stripePriceId}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="features"
                placeholder="Features (comma separated)"
                value={form.features}
                onChange={handleChange}
                className="border p-2 rounded col-span-2"
              />

              <label className="flex items-center gap-2 col-span-2">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={form.isPopular}
                  onChange={handleChange}
                />
                Mark as Popular
              </label>

              <div className="col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editingId ? "Update Plan" : "Create Plan"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white border border-gray-300 rounded-xl p-6">
          {loading ? (
            <p>Loading plans...</p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#f2f2f6] text-gray-600">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Popular</th>
                  <th className="p-3">Stripe Price ID</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan._id} className="border-b">
                    <td className="p-3 font-medium">{plan.name}</td>
                    <td className="p-3">₹{plan.price}</td>
                    <td className="p-3">{plan.duration} days</td>
                    <td className="p-3">
                      {plan.isPopular ? (
                        <span className="inline-flex items-center gap-1 text-yellow-600">
                          <Star size={14} /> Popular
                        </span>
                      ) : (
                        "No"
                      )}
                    </td>
                    <td className="p-3 text-xs">{plan.stripePriceId}</td>
                    <td className="p-3 text-center flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="text-blue-600"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(plan._id)}
                        className="text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {plans.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-6 text-gray-500">
                      No plans created yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}