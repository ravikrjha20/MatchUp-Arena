import useMatchStore from "../store/useMatchStore";

export const setupMatchHandlers = (socket, onMatchFound) => {
  if (!socket) return;

  socket.on("matchFound", ({ opponentId, opponentName }) => {
    console.log("🎯 Matched with:", opponentId, opponentName);
    toast.success(`Matched with ${opponentName || opponentId}`);

    useMatchStore.getState().setOpponentInfo({ opponentId, opponentName });

    if (onMatchFound) onMatchFound({ opponentId, opponentName });
  });

  socket.on("playMatchOnline1v1", ({ userMask, opponentMask }) => {
    useMatchStore.getState().setUserMask(userMask);
    useMatchStore.getState().setOpponentMask(opponentMask);
  });
};
