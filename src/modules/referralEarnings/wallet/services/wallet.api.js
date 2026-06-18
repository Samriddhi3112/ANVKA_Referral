import { axiosInstance } from "../../../../app/auth/services/apiClient";

export const getWalletApi = () => {
  return axiosInstance.get("/referral/wallet");
};
 
export const getEarningsApi = (type, page = 1, filterType = "") => {
  const params = { type, page };
  if (filterType) params.type = filterType; 
  return axiosInstance.get("/referral/wallet/earnings", { params });
};

export const getTransactionsApi = (page = 1, filterType = "") => {
  const params = { page };
  if (filterType) params.type = filterType;
  return axiosInstance.get("/referral/wallet/transactions", { params });
};