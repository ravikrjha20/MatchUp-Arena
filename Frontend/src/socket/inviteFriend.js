import { useNavigate } from "react-router-dom";
import useMatchStore from "../store/useMatchStore";
import useNotificationStore from "../store/useNotificationStore";
import { toast } from "react-toastify";
import { checkFriend } from "../utils/someCleanup";

export const setupInviteHandlers = (socket, onMatchFound) => {
  if (!socket) return;
  const {
    setOpponentInfo,
    handleMatchTimeout,
    setUserMask,
    setOpponentMask,
    setTurn,
    setUserMark,
    setOpponentMark,
    setMatchStatus,
    acceptInvite,
    rejectInvite,
  } = useMatchStore.getState();
  const { showNotification } = useNotificationStore.getState();
  const handleFriendInvite = (fromId, fromName) => {
    const message = `${fromName} is inviting you to play 1v1`;
    const type = "invitation";

    showNotification(message, type, {
      onAccept: () => acceptInvite(fromId),
      onReject: () => rejectInvite(fromId),
    });
  };
  socket.on("friendInvite", handleFriendInvite);
  // Return a cleanup function to remove listeners when the component unmounts
  return () => {
    socket.off("matchFound", handleMatchFound);
    socket.off("matchTimeout", handleMatchTimeoutEvent);
    socket.off("playMatchOnline1v1", handleGameMove);
    socket.off("friendInvite", handleFriendInvite);
  };
};
