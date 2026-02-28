import axiosInstance from "../axiosInstance";

export const usersApi = {
  getAll: (params) => axiosInstance.get("/users", { params }),
  getById: (id) => axiosInstance.get(`/users/${id}`),
  create: (data) => axiosInstance.post("/users", data),
  update: (id, data) => axiosInstance.put(`/users/${id}`, data),
  remove: (id) => axiosInstance.delete(`/users/${id}`),
};
