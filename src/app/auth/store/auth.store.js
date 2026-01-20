import { create } from "zustand";
import {
  registerReferralApi,
  loginWithPasswordApi,
  requestLoginOtpApi,
  verifyLoginOtpApi,
  forgotPasswordOtpApi,
  resendPasswordOtpApi,
  verifyForgotPasswordOtpApi,
  resetPasswordApi,
  uploadProfileImageApi,
} from "../services/auth.api";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  profilePic: null, 
  uploadedProfileUrl: null, 

  setProfilePic: (file) => set({ profilePic: file }),

  uploadProfilePic: async () => {
    const { profilePic } = useAuthStore.getState();

    if (!profilePic) return alert("Please select an image first!");

    try {
      set({ loading: true, error: null });

      const res = await uploadProfileImageApi(profilePic);

      set({
        loading: false,
        uploadedProfileUrl: res.data.url || null, 
      });

      alert("Image uploaded successfully!");
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || err.message || "Upload failed",
      });

      alert("Upload failed. Try again!");
      throw err;
    }
  },

  registerReferral: async (payload) => {
    try {
      set({ loading: true, error: null });
      await registerReferralApi(payload);
      set({ loading: false });
      return true;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Registration failed",
      });
      throw err;
    }
  },

  loginWithPassword: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await loginWithPasswordApi(data);

      localStorage.setItem("token", res.data.token);

      set({
        token: res.data.token,
        isAuthenticated: true,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Login failed",
      });

      throw err;
    }
  },

  requestLoginOtp: async (payload) => {
    try {
      set({ loading: true, error: null });

      await requestLoginOtpApi(payload);

      set({ loading: false, otpSent: true });
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "OTP send failed";

      set({
        loading: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  verifyLoginOtp: async ({ phoneOrEmail, countryCode, otpCode }) => {
    try {
      set({ loading: true, error: null });

      const res = await verifyLoginOtpApi({
        phoneOrEmail,
        countryCode,
        otpCode,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      set({
        token,
        isAuthenticated: true,
        loading: false,
      });

      return res;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Invalid OTP",
      });
      throw err;
    }
  },

  forgotPasswordOtp: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await forgotPasswordOtpApi(data);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      set({ loading: false });
      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err.message,
      });
      throw err;
    }
  },

  resendPasswordOtp: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await resendPasswordOtpApi(data);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      set({ loading: false });
      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err.message,
      });

      throw err;
    }
  },

  verifyForgotPasswordOtp: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await verifyForgotPasswordOtpApi(data);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      set({ loading: false });
      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err.message ||
        "OTP verification failed";

      set({
        loading: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  resetPassword: async (data) => {
    try {
      set({ loading: true, error: null });
      await resetPasswordApi(data);
      set({ loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Password reset failed",
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      isAuthenticated: false,
    });
  },
}));
