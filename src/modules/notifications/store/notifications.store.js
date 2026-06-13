import { create } from "zustand";
import {
  getNotificationsApi,
  getUnreadNotificationsCountApi,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi,
  deleteNotificationApi,
} from "../services/notifications.api";

export const useNotificationsStore = create((set) => ({
  notifications: [],
  unreadCount: 0,
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,

  getNotifications: async (params = {}) => {
    try {
      set({ loading: true, error: null });

      const res = await getNotificationsApi(params);

      set({
        notifications: res?.data?.data?.notifications || res?.data?.data || [],
        total: res?.data?.data?.total || 0,
        page: res?.data?.data?.page || 1,
        limit: res?.data?.data?.limit || 10,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to fetch notifications",
      });

      throw err;
    }
  },

  getUnreadCount: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getUnreadNotificationsCountApi();

      set({
        unreadCount: res?.data?.data?.unreadCount ?? 0,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to fetch unread count",
      });

      throw err;
    }
  },

  markAsRead: async (id) => {
    try {
      set({ loading: true, error: null });

      await markNotificationAsReadApi(id);

      set((state) => ({
        loading: false,
        unreadCount: state.unreadCount > 0 ? state.unreadCount - 1 : 0,
        notifications: state.notifications.map((n) =>
          n._id === id ? { ...n, isRead: true } : n,
        ),
      }));

      return true;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message || "Failed to mark notification as read",
      });
      throw err;
    }
  },

  markAllAsRead: async () => {
    try {
      set({ loading: true, error: null });

      await markAllNotificationsAsReadApi();

      set((state) => ({
        unreadCount: 0,
        loading: false,
        notifications: state.notifications.map((n) => ({
          ...n,
          isRead: true,
        })),
      }));

      return true;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to mark all notifications as read",
      });
      throw err;
    }
  },

  deleteNotification: async (id) => {
    try {
      set({ loading: true, error: null });

      await deleteNotificationApi(id);

      set({
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to delete notification",
      });

      throw err;
    }
  },
}));
