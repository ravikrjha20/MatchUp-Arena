// src/store/useNotificationStore.js
import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  isVisible: false,
  message: "ravi is inviting u to play 1 v 1",
  type: "notification",
  timerId: 20000,
  // Add dummy functions so they always exist
  onAccept: () => {},
  onReject: () => {},

  // Options object now carries the callbacks
  showNotification: (message, type = "notification", options = {}) => {
    // Clear previous timer
    const { timerId } = get();
    if (timerId) clearTimeout(timerId);

    // Invitations last 20s, standard notifications last 5s
    const duration = type === "invitation" ? 20000 : 5000;

    const newTimerId = setTimeout(() => {
      get().hideNotification(); // Use the hide function to reset state
    }, duration);

    set({
      isVisible: true,
      message,
      type,
      timerId: newTimerId,
      // Set the accept/reject handlers, or use empty functions as fallback
      onAccept: options.onAccept || (() => {}),
      onReject: options.onReject || (() => {}),
    });
  },

  hideNotification: () => {
    const { timerId } = get();
    if (timerId) clearTimeout(timerId);
    set({
      isVisible: false,
      message: "",
      type: "notification", // Reset to default
      timerId: null,
      onAccept: () => {}, // Reset callbacks
      onReject: () => {},
    });
  },
}));

export default useNotificationStore;
