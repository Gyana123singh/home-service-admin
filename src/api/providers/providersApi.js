import axiosInstance from "../axiosInstance";

export const providersApi = {
  // GET /api/admin/vendors?status=all|pending|approved|rejected
  getAll: (status = "all") =>
    axiosInstance.get(`/vendors?status=${status}`),

  // PUT /api/admin/vendors/:id/approve
  approve: (id) =>
    axiosInstance.put(`/vendors/${id}/approve`),

  // PUT /api/admin/vendors/:id/reject
  reject: (id, reason) =>
    axiosInstance.put(`/vendors/${id}/reject`, { reason }),
};