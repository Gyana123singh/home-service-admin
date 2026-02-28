import axiosInstance from "../axiosInstance";

export const subscriptionApi = {
  list: () => axiosInstance.get("/subscription"),
  create: (data) => axiosInstance.post("/subscription", data),
  update: (id, data) => axiosInstance.put(`/subscription/${id}`, data),
  remove: (id) => axiosInstance.delete(`/subscription/${id}`),
};