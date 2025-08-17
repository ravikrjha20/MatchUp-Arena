// store/useFriendStore.js
import { create } from "zustand";
import axiosInstance from "../../lib/axios";
import { toast } from "react-toastify";

const useFriendStore = create((set, get) => ({
  /* ---------- state ---------- */
  friends: [],
  incomingRequests: [],
  outgoingRequests: [],
  pendingRequestsCount: 0,

  /* ---------- getters ---------- */
  cancelRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/friend/cancelRequest/${friendId}`);
      toast.success("Friend request removed!");
      /* 🔧 refresh outgoing list so UI updates immediately */
      await get().getOutgoingRequests();
    } catch (error) {
      toast.error("Failed to remove friends");
      console.error(error);
      throw error;
    }
  },
  getAllFriends: async () => {
    try {
      const res = await axiosInstance.get("/friend/getallfriend/");
      set({ friends: res.data.friends || [] });
    } catch (err) {
      toast.error("Failed to fetch friends");
      console.error(err);
      throw err;
    }
  },

  getIncomingRequests: async () => {
    try {
      const res = await axiosInstance.get("/friend/incoming");
      const requests = res.data.requests || [];
      set({
        incomingRequests: requests,
        pendingRequestsCount: requests.length,
      });
    } catch (err) {
      toast.error("Failed to fetch incoming requests");
      console.error(err);
      throw err;
    }
  },

  getOutgoingRequests: async () => {
    try {
      const res = await axiosInstance.get("/friend/outgoing");
      set({ outgoingRequests: res.data.requests || [] });
    } catch (err) {
      toast.error("Failed to fetch outgoing requests");
      console.error(err);
      throw err;
    }
  },

  /* ---------- actions ---------- */
  sendRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/friend/request/${friendId}`);
      toast.success("Friend request sent!");
      /* 🔧 refresh outgoing list so UI updates immediately */
      await get().getOutgoingRequests();
    } catch (err) {
      toast.error("Could not send friend request");
      console.error(err);
      throw err;
    }
  },

  acceptRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/friend/accept/${friendId}`);
      toast.success("Friend request accepted!");
      /* 🔧 refresh affected slices */
      await get().getAllFriends();
      await get().getIncomingRequests();
    } catch (err) {
      toast.error("Could not accept friend request");
      console.error(err);
      throw err;
    }
  },

  declineRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/friend/decline/${friendId}`);
      toast.success("Friend request declined!");
      await get().getIncomingRequests(); // refresh
    } catch (err) {
      toast.error("Could not decline friend request");
      console.error(err);
      throw err;
    }
  },

  removeFriend: async (friendId) => {
    try {
      await axiosInstance.delete(`/friend/remove/${friendId}`);
      toast.success("Friend removed!");
      await get().getAllFriends(); // refresh
    } catch (err) {
      toast.error("Could not remove friend");
      console.error(err);
      throw err;
    }
  },
}));

export default useFriendStore;
