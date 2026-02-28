import axiosInstance from "../axiosInstance";

export const adminServiceApi = {
  createService: (formData) =>
    axiosInstance.post("/services/add-service", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // ✅ NEW
  getServices: (params) =>
    axiosInstance.get("/services/get-service", { params }),
};
