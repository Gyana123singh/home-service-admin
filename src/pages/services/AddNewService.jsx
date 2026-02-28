import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { adminServiceApi } from "../../api/services/add-service";
import { categoryApi } from "../../api/category/add-categoryApi";

export default function CreateService() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    category: "",
    price: "",
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [requirements, setRequirements] = useState([
    {
      label: "Area size",
      options: [
        { label: "1 Room", price: 0 },
        { label: "2 Rooms", price: 500 },
      ],
    },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await categoryApi.getCategories({
          page: 1,
          limit: 100,
        });
        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        alert("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateRequirementLabel = (i, value) => {
    const copy = [...requirements];
    copy[i].label = value;
    setRequirements(copy);
  };

  const updateOption = (ri, oi, field, value) => {
    const copy = [...requirements];
    copy[ri].options[oi][field] = value;
    setRequirements(copy);
  };

  const addRequirement = () => {
    setRequirements([
      ...requirements,
      { label: "", options: [{ label: "", price: 0 }] },
    ]);
  };

  const removeRequirement = (i) => {
    setRequirements(requirements.filter((_, idx) => idx !== i));
  };

  const addOption = (ri) => {
    const copy = [...requirements];
    copy[ri].options.push({ label: "", price: 0 });
    setRequirements(copy);
  };

  const removeOption = (ri, oi) => {
    const copy = [...requirements];
    copy[ri].options.splice(oi, 1);
    setRequirements(copy);
  };
  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("shortDescription", form.shortDescription);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", form.price);

      // ✅ NORMALIZE REQUIREMENTS HERE
      const normalizedRequirements = requirements.map((r) => ({
        label: r.label,
        options: r.options.map((o) => ({
          label: o.label,
          extraPrice: Number(o.price),
        })),
      }));

      // ✅ SEND TO BACKEND
      formData.append("requirements", JSON.stringify(normalizedRequirements));

      const res = await adminServiceApi.createService(formData);

      alert("✅ Service created successfully!");
      console.log("Created:", res.data);
    } catch (err) {
      console.error("Create service error:", err);
      alert(err.response?.data?.message || "Failed to create service");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Services</h1>
            <p className="text-sm text-gray-500">
              Dashboard / Service / Add Service
            </p>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4">
              <h2 className="font-semibold text-gray-800">
                Add Service Details
              </h2>
            </div>

            <form onSubmit={submit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Title of the service
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Slug</label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Short Description
                </label>
                <input
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                >
                  <option value="">
                    {loadingCategories
                      ? "Loading categories..."
                      : "Select Category"}
                  </option>

                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Base Price
                </label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Service Requirements
                </h3>

                {requirements.map((req, ri) => (
                  <div
                    key={ri}
                    className="border rounded-lg p-4 bg-gray-50 mb-4"
                  >
                    <div className="flex gap-2 mb-3">
                      <input
                        value={req.label}
                        onChange={(e) =>
                          updateRequirementLabel(ri, e.target.value)
                        }
                        placeholder="Requirement label"
                        className="border px-3 py-2 rounded w-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeRequirement(ri)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    {req.options.map((opt, oi) => (
                      <div key={oi} className="flex gap-2 mb-2">
                        <input
                          value={opt.label}
                          onChange={(e) =>
                            updateOption(ri, oi, "label", e.target.value)
                          }
                          placeholder="Option label"
                          className="border px-3 py-2 rounded flex-1"
                        />
                        <input
                          type="number"
                          value={opt.price}
                          onChange={(e) =>
                            updateOption(ri, oi, "price", e.target.value)
                          }
                          placeholder="Extra price"
                          className="border px-3 py-2 rounded w-32"
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(ri, oi)}
                          className="text-red-600 text-sm"
                        >
                          X
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addOption(ri)}
                      className="text-blue-600 text-sm"
                    >
                      + Add Option
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addRequirement}
                  className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded"
                >
                  + Add Requirement
                </button>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
