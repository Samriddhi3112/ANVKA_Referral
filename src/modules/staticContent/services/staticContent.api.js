import { axiosInstance } from "../../../services/apiClient";

export const getStaticContentApi = (type) => {
  return axiosInstance.get("/referral/static-content", {
    params: { type },
  });
};