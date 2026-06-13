import { axiosInstance } from "../../../app/auth/services/apiClient";

// Get notifications list
export const getNotificationsApi = (params) => {
  return axiosInstance.get("/referral/notifications", {
    params,
  });
};

// Get unread notifications count
export const getUnreadNotificationsCountApi = () => {
  return axiosInstance.get("/referral/notifications/unread-count");
};

// Mark notification as read
export const markNotificationAsReadApi = (id) => {
  return axiosInstance.patch(`/referral/notifications/${id}/read`);
};

// Mark all notifications as read
export const markAllNotificationsAsReadApi = () => {
  return axiosInstance.patch("/referral/notifications/read-all");
};

// Delete notification
export const deleteNotificationApi = (id) => {
  return axiosInstance.delete(`/referral/notifications/${id}`);
};