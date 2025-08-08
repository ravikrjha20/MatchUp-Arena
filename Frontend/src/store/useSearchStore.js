// store/useSearchStore.js

import { create } from "zustand";
import axiosInstance from "../../lib/axios";
import { toast } from "react-toastify";

const useSearchStore = create((set) => ({
  suggestedFriends: [],
  searchedUsers: [],
  searchedProfile: null,

  searchProfile: async (username) => {
    try {
      const res = await axiosInstance.get(`/friend/profile/${username}`);
      set({ searchedProfile: res.data.profile || null });
    } catch (err) {
      toast.error("Failed to fetch profile.");
      set({ searchedProfile: null }); // Set to null on error
      console.error(err);
    }
  },

  clearSearchedProfile: () => set({ searchedProfile: null }),

  getSuggestions: async (name) => {
    try {
      const res = await axiosInstance.get(`/friend/suggestions?name=${name}`);
      set({ suggestedFriends: res.data.suggestions || [] });
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    }
  },

  searchUsers: async (name) => {
    if (!name.trim()) {
      set({ searchedUsers: [] });
      return;
    }
    try {
      const res = await axiosInstance.get(
        `/friend/search?name=${encodeURIComponent(name)}`
      );
      set({ searchedUsers: res.data.users || [] });
    } catch (err) {
      toast.error("Failed to search users");
      console.error(err);
    }
  },

  clearSearchedUsers: () => {
    set({ searchedUsers: [] });
  },
}));

export default useSearchStore;
