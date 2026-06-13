import { axiosInstance } from "../../../services/apiClient";

export const createWithdrawalApi = (data) => {
  return axiosInstance.post("/referral/withdrawals", data);
};

export const getWithdrawalsApi = () => {
  return axiosInstance.post("/referral/withdrawals");
};