import { axiosInstance } from "../../../services/apiClient";

export const getWalletApi = () => {
  return axiosInstance.get("/referral/wallet");
};

export const getEarningsApi = (type) => {
  return axiosInstance.get("/referral/wallet/earnings", {
    params: { type },
  });
};