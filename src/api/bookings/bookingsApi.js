import axiosInstance from "../axiosInstance";

export const bookingsApi = {
  getAll: (params) => axiosInstance.get("/bookings", { params }),
  getById: (id) => axiosInstance.get(`/bookings/${id}`),
  create: (data) => axiosInstance.post("/bookings", data),
  cancel: (id) => axiosInstance.post(`/bookings/${id}/cancel`),
};
