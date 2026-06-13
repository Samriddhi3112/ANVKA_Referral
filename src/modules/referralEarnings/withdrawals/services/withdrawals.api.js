import { axiosInstance } from "../../../../app/auth/services/apiClient";

export const createWithdrawalApi = (data) => {
  return axiosInstance.post("/referral/withdrawals", data);
};
 
export const getWithdrawalsApi = (page = 1) => {
  return axiosInstance.get("/referral/withdrawals", {
    params: { page },
  });
};