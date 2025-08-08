import { create } from "zustand";
import axiosInstance from "../../lib/axios";
import { toast } from "react-toastify";
import { connectSocket, disconnectSocket } from "../socket/socket";

const useAuthStore = create((set, get) => ({
  user: null,
  onlineUsers: [],

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout", { withCredentials: true });
      disconnectSocket();
      set({ user: null, onlineUsers: [] });
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  login: async (req) => {
    try {
      const res = await axiosInstance.post("/auth/login", req, {
        withCredentials: true,
      });
      const user = res.data.user;
      set({ user });
      get().connectSocket(user._id);
      toast.success("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.msg || "Login failed");
    }
  },

  register: async (req) => {
    try {
      const res = await axiosInstance.post("/auth/register", req, {
        withCredentials: true,
      });
      const user = res.data.user;
      set({ user });
      get().connectSocket(user._id);
      toast.success("Registration successful");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error?.response?.data?.msg || "Registration failed");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });
      const user = res.data.user;
      set({ user });
      get().connectSocket(user._id);
    } catch (error) {
      set({ user: null });
    }
  },

  connectSocket: (userId) => {
    connectSocket(
      userId,
      (opponentId) => {
        // handle matchFound
        console.log("🏁 Match found with:", opponentId);
      },
      (userIds) => {
        set({ onlineUsers: userIds });
      }
    );
  },

  disConnectSocket: () => {
    disconnectSocket();
    set({ onlineUsers: [] });
  },
}));

export default useAuthStore;
