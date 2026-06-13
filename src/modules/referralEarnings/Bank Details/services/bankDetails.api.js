import { axiosInstance } from "../../../../app/auth/services/apiClient";

// GET Bank Details
export const getBankDetailsApi = () => {
  return axiosInstance.get("/referral/withdrawals/bank-details");
};

// ADD / UPDATE Bank Details
export const saveBankDetailsApi = (payload) => {
  return axiosInstance.put("/referral/withdrawals/bank-details", payload);
};