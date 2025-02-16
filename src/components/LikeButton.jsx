import { useState } from "react";
import API from "../api";

const LikeButton = ({ postId, initialLikes, isLiked, token }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = async () => {
    await API.post(`/posts/${postId}/like`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return <button onClick={toggleLike}>{liked ? "❤️" : "🤍"} {likes}</button>;
};

export default LikeButton;