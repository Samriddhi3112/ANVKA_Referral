import { create } from "zustand";
import { axiosInstance } from "../../../app/auth/services/apiClient";
import {
  requestLogoutApi,
} from "../../../app/auth/services/auth.api";

export const useProfileStore = create((set) => ({
  profile: null,
  user: null,
  loading: false,
  error: null,

  clearProfile: () =>
    set({
      user: null,
      loading: false,
      error: null,
    }),

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/auth/referral/profile");
      set({ user: response.data, loading: false });
    } catch (err) {
      set({ error: err.message || err.message, loading: false });
    }
  },

  updateProfile: async (payload) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.put(
        "/auth/referral/update-profile",
        payload
      );

      set({
        user: response.data,
        loading: false,
      });

      return response.data;
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to update profile",
        loading: false,
      });
      throw err;
    }
  },

  changePassword: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post(
        "/auth/referral/change-password",
        payload
      );

      set({ loading: false });
      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to change password",
      });
      throw err;
    }
  },

  logout: async () => {
  try {
    // 1️⃣ Backend logout (fail bhi ho to state clear honi chahiye)
    await requestLogoutApi();
  } catch (error) {
    console.log("Logout API failed", error);
  } finally {
    // 2️⃣ Token clear
    sessionStorage.removeItem("token");

    // 3️⃣ Auth related sab kuch reset
    set({
      token: null,
      isAuthenticated: false,
      profilePic: null,          // 🔥 image file clear
      uploadedProfileUrl: null,  // 🔥 uploaded image url clear
      user: null,
      error: null,
      loading: false,
    });

    // 4️⃣ Profile store bhi clear (MOST IMPORTANT)
    const { clearProfile } = useProfileStore.getState();
    clearProfile();
  }
},

}));
