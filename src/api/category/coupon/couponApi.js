import axiosInstance from "../../axiosInstance";
// adjust path if your axiosInstance is elsewhere

export const couponApi = {
  getCoupons: (params) => axiosInstance.get("/coupons/get-coupons", { params }),

  createCoupon: (data) => axiosInstance.post("/coupons/create-coupon", data),

  updateCoupon: (id, data) =>
    axiosInstance.put(`/coupons/update-coupon/${id}`, data),

  toggleStatus: (id) => axiosInstance.patch(`/coupons/${id}/toggle`),

  deleteCoupon: (id) => axiosInstance.delete(`/coupons/delete-coupon/${id}`),
};
