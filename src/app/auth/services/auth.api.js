import { axiosInstance } from "./apiClient";

export const registerReferralApi = (data) => {
  return axiosInstance.post("/auth/referral/register", data);
};

export const loginWithPasswordApi = (data) => {
  return axiosInstance.post("/auth/referral/login", data);
};

export const requestLoginOtpApi = (data) => {
  return axiosInstance.post("/auth/referral/login/otp/request", data);
};

export const verifyLoginOtpApi = (data) => {
  return axiosInstance.post("/auth/referral/login/otp/verify", data);
};

export const forgotPasswordOtpApi = (data) => {
  return axiosInstance.post("/auth/referral/forgot-password", data);
};

export const resendPasswordOtpApi = (data) => {
  return axiosInstance.post("/auth/referral/forgot-password/otp/resend", data);
};

export const verifyForgotPasswordOtpApi = (data) => {
  return axiosInstance.post("/auth/referral/forgot-password/otp/verify", data);
};

export const resetPasswordApi = (data) => {
  return axiosInstance.post("/auth/referral/reset-password", data);
};

export const requestLogoutApi = () => {
  return axiosInstance.post("/auth/referral/logout");
};

export const uploadProfileImageApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch("https://mobulousdev.co.in/anvka/api/v1/upload-file", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
};
