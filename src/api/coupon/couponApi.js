import axiosInstance from "../axiosInstance";

const couponApi = {
  // Get coupons (with search, page, limit)
  getCoupons: (params) =>
    axiosInstance.get("/coupons/get-coupons", { params }),

  // Create new coupon
  createCoupon: (data) =>
    axiosInstance.post("/coupons/create-coupon", data),

  // Update coupon
  updateCoupon: (id, data) =>
    axiosInstance.put(`/coupons/update-coupon/${id}`, data),

  // Delete coupon
  deleteCoupon: (id) =>
    axiosInstance.delete(`/coupons/delete-coupon/${id}`),

  // Toggle active/inactive
  toggleStatus: (id) =>
    axiosInstance.patch(`/coupons/${id}/toggle`),
};

export default couponApi;