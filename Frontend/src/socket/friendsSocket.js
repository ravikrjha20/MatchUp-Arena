import useFriendStore from "../store/useFriendStore";

export const setUpFriends = (socket) => {
  if (!socket) return;

  const { getAllFriends, getIncomingRequests, getOutgoingRequests } =
    useFriendStore.getState();

  const updateFriendList = () => getAllFriends();
  const updateIncomingRequest = () => getIncomingRequests();
  const updateOutgoingReq = () => getOutgoingRequests();
  const friendRemoved = () => getAllFriends();
  const friendStatusChanged = () => getAllFriends();

  socket.on("updateFriendList", updateFriendList);
  socket.on("updateIncomingRequest", updateIncomingRequest);
  socket.on("updateOutgoingReq", updateOutgoingReq);
  socket.on("friendRemoved", friendRemoved);
  socket.on("friendStatusChanged", friendStatusChanged);

  return () => {
    socket.off("updateFriendList", updateFriendList);
    socket.off("updateIncomingRequest", updateIncomingRequest);
    socket.off("updateOutgoingReq", updateOutgoingReq);
    socket.off("friendRemoved", friendRemoved);
    socket.off("friendStatusChanged", friendStatusChanged);
  };
};
