import axiosInstance from "../axiosInstance";

export const notificationsApi = {
  list: () => axiosInstance.get("/notifications"),
  markRead: (id) => axiosInstance.post(`/notifications/${id}/read`),
};
