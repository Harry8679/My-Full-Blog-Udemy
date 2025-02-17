import { useState } from "react";
import API from "../api";

const LikeButton = ({ postId, initialLikes, isLiked, token }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      const response = await API.post(`/posts/${postId}/like`, {}, { 
        headers: { Authorization: `Bearer ${token}` }
      });

      setLikes(response.data.likes);
      setLiked(!liked);
    } catch (err) {
      console.error("❌ Erreur lors du like :", err);
      alert("Impossible d'ajouter un like.");
    }
  };

  return (
    <button 
      onClick={handleLike} 
      className={`px-4 py-2 rounded transition ${
        liked ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 hover:bg-gray-400"
      }`}
    >
      {liked ? "❤️ J'aime" : "🤍 J'aime"} ({likes})
    </button>
  );
};

export default LikeButton;