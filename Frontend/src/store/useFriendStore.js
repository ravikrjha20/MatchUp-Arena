// store/useFriendStore.js

import { create } from "zustand";
import axiosInstance from "../../lib/axios";
import { toast } from "react-toastify";

const useFriendStore = create((set) => ({
  friends: [],
  incomingRequests: [],
  outgoingRequests: [],
  pendingRequestsCount: 0,

  getAllFriends: async () => {
    try {
      const res = await axiosInstance.get("/friend/getallfriend/");
      set({ friends: res.data.friends || [] });
    } catch (err) {
      toast.error("Failed to fetch friends");
      console.error(err);
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
    }
  },

  getOutgoingRequests: async () => {
    try {
      const res = await axiosInstance.get("/friend/outgoing");
      set({ outgoingRequests: res.data.requests || [] });
    } catch (err) {
      toast.error("Failed to fetch outgoing requests");
      console.error(err);
    }
  },

  sendRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/friend/request/${friendId}`);
      toast.success("Friend request sent!");
    } catch (err) {
      toast.error("Could not send friend request");
      console.error(err);
    }
  },

  acceptRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/friend/accept/${friendId}`);
      toast.success("Friend request accepted!");
      // Refresh friends and requests after accepting
      get().getAllFriends();
      get().getIncomingRequests();
    } catch (err) {
      toast.error("Could not accept friend request");
      console.error(err);
    }
  },

  declineRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/friend/decline/${friendId}`);
      toast.success("Friend request declined!");
      // Refresh requests after declining
      get().getIncomingRequests();
    } catch (err) {
      toast.error("Could not decline friend request");
      console.error(err);
    }
  },

  removeFriend: async (friendId) => {
    try {
      await axiosInstance.delete(`/friend/remove/${friendId}`);
      toast.success("Friend removed!");
      // Refresh friends list after removing
      get().getAllFriends();
    } catch (err) {
      toast.error("Could not remove friend");
      console.error(err);
    }
  },
}));

export default useFriendStore;
