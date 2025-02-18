import { useState } from "react";
import API from "../api";

const CommentForm = ({ postId, token, setComments }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Le commentaire ne peut pas être vide !");
      return;
    }

    if (!token) {
      alert("Vous devez être connecté pour commenter.");
      return;
    }

    try {
      const response = await API.post(`/comments/${postId}`, 
        { content }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newComment = response.data;

      // 🔥 Met à jour les commentaires sans rafraîchir
      setComments(prevComments => [...prevComments, newComment]);

      setContent("");
      setError(null);
    } catch (err) {
      console.error("❌ Erreur lors de l'ajout du commentaire :", err);
      setError("Impossible d'ajouter le commentaire.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {error && <p className="text-red-500">{error}</p>}
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        className="w-full p-2 border rounded-lg" 
        placeholder="Écrivez un commentaire..."
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
      >
        Commenter
      </button>
    </form>
  );
};

export default CommentForm;