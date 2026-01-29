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
  requestLogoutApi,
} from "../services/auth.api";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  profilePic: null,
  uploadedProfileUrl: null,

  user: null,
  clearProfile: () =>
    set({
      user: null,
      loading: false,
      error: null,
    }),

     resetProfileImage: () =>
    set({
      profilePic: null,
      uploadedProfileUrl: null,
    }),

  setProfilePic: (file) => set({ profilePic: file }),

  uploadProfilePic: async (file) => {
    const fileToUpload = file || get().profilePic;
    if (!fileToUpload) throw new Error("No file selected");

    try {
      set({ loading: true, error: null });

      const res = await uploadProfileImageApi(fileToUpload);

      const uploadedUrl = res?.data || null;

      if (!uploadedUrl) {
        throw new Error("Failed to get uploaded file URL from API");
      }

      set({
        loading: false,
        uploadedProfileUrl: uploadedUrl,
      });

      return uploadedUrl;
    } catch (err) {
      set({ loading: false, error: err?.message || "Upload failed" });
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
        error:
          err?.message || err?.response?.data?.message || "Registration failed",
      });
      throw err;
    }
  },

  loginWithPassword: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await loginWithPasswordApi(data);

      localStorage.setItem("token", res.data.data.token);

      set({
        token: res.data.data.token,
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

      const res = await requestLoginOtpApi(payload);

      set({ loading: false, otpSent: true });
      return res?.data || res;
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

      const token = res.data.data.token;
      localStorage.setItem("token", token);

      set({
        token,
        isAuthenticated: true,
        loading: false,
      });

      return res.data.data;
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

  logout: async () => {
  
    try {
      await requestLogoutApi();

      localStorage.removeItem("token");

      set({
        token: null,
        isAuthenticated: false,
        profilePic: null,
        uploadedProfileUrl: null,
        error: null,
        user: null,
      });
      useProfileStore.getState().clearProfile();
      
    } catch (error) {
      console.log("Logout failed", error);

      localStorage.removeItem("token");
      set({
        token: null,
        isAuthenticated: false,
      });
    }
  },
}));
