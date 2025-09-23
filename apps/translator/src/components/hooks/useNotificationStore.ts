import { create } from "zustand";
import {
  postClearNotifications,
  getNotifications,
  getUnreadNotificationsCount,
} from "@shared/services/translatorApi";
import type { NotificationType } from "../../types/types";

interface NotificationStore {
  unreadCount: number;
  notifications: NotificationType[];
  setUnreadCount: (count: number) => void;
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  clearNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadCount: 0,
  notifications: [],
  setUnreadCount: (count) => set({ unreadCount: count }),
  fetchUnreadCount: async () => {
    try {
      const res = await getUnreadNotificationsCount();
      set({ unreadCount: res.data });
    } catch (err) {
      console.error("Ошибка при получении количества уведомлений", err);
    }
  },
  fetchNotifications: async () => {
    try {
      const res = await getNotifications();
      const sorted = [...res.data.content].sort((a, b) => {
        return Number(a.isRead) - Number(b.isRead);
      });
      set({ notifications: sorted });
    } catch (err) {
      console.error("Ошибка загрузки уведомлений:", err);
    }
  },

  clearNotifications: async () => {
    try {
      await postClearNotifications();
      set({ unreadCount: 0 }); // обновим глобально
    } catch (err) {
      console.error("Ошибка при очистке уведомлений", err);
    }
  },
}));
