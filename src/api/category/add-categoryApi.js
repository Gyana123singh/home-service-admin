import axiosInstance from "../axiosInstance";

export const categoryApi = {
  addCategory: (formData) =>
    axiosInstance.post("/category/add-category", formData),
  
  getCategories: (params = {}) =>
    axiosInstance.get("/category/get-category", { params }),
};
