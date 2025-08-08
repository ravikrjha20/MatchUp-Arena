import { create } from "zustand";
import axiosInstance from "../../lib/axios";

const useMatchStore = create((set) => ({
  userMask: 0,
  opponentMask: 0,
  turn: "",
  mark: "X",
  opponentMark: "O",
  opponentId: null,
  opponentName: null,

  setUserMask: (mask) => set({ userMask: mask }),
  setOpponentMask: (mask) => set({ opponentMask: mask }),
  setTurn: (turn) => set({ turn }),
  findPlayer: async () => {
    const res = axiosInstance.get(`play/playonevone`);
  },
  setOpponentInfo: ({ opponentId, opponentName }) =>
    set({ opponentId, opponentName }),

  resetMatch: () =>
    set({
      userMask: 0,
      opponentMask: 0,
      turn: "user",
      opponentId: null,
      opponentName: null,
    }),
}));

export default useMatchStore;
