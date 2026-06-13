import { axiosInstance } from "../../../services/apiClient";

export const getFaqsApi = () => {
  return axiosInstance.get("/referral/faqs");
};