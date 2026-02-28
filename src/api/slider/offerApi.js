import axiosInstance from "../axiosInstance";

export const offerApi = {
  // ✅ Create Global Offer
  createGlobalOffer: (data) =>
    axiosInstance.post("/offers/create-global-offer", data),

  // ✅ Get All Offers
  getAllOffers: () => axiosInstance.get("/offers/all-offers"),

  // ✅ Toggle Offer Status (Activate / Deactivate)
  toggleOfferStatus: (id) => axiosInstance.patch(`/offers/toggle-offer/${id}`),
};
