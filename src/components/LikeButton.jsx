import { useState } from "react";
import API from "../api";

const LikeButton = ({ postId, initialLikes, isLiked, token }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = async () => {
    try {
      await API.post(`/posts/${postId}/like`, {}, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    } catch (error) {
      console.error("Erreur lors du like :", error);
    }
  };

  return (
    <button onClick={toggleLike} className="mt-4">
      {liked ? "❤️" : "🤍"} {likes}
    </button>
  );
};


export default LikeButton;