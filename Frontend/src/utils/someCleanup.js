// utils/isFriend.js
import useFriendStore from "../store/useFriendStore";
import useAuthStore from "../store/useAuthStore";

export const checkFriend = (friendId) => {
  const friends = useFriendStore.getState().friends;
  const currentUserId = useAuthStore.getState().user?._id;

  if (!friendId || !currentUserId) return false;

  return friends.some(
    (f) => f._id === friendId || f._id === currentUserId // ensure correct match
  );
};
