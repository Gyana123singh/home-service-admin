import axiosInstance from "../../api/axiosInstance";

// ✅ Get All Customers
export const getAllCustomers = () => {
  return axiosInstance.get("/profile");
};

// ✅ Delete Customer
export const deleteCustomerById = (id) => {
  return axiosInstance.delete(`/delete-customer/${id}`);
};
