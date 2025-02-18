import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LikeButton from "../components/LikeButton";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const PostDetail = ({ user }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // 🔥 État des commentaires

  useEffect(() => {
    axios.get(`http://localhost:4400/api/posts/${id}`)
      .then((res) => {
        console.log("📌 Post récupéré :", res.data);
        setPost(res.data);
      })
      .catch((err) => console.error("❌ Erreur de récupération du post :", err));

    // 🔥 Récupération des commentaires
    axios.get(`http://localhost:4400/api/comments/${id}`)
      .then((res) => {
        console.log("📌 Commentaires récupérés :", res.data);
        setComments(res.data);
      })
      .catch((err) => console.error("❌ Erreur de récupération des commentaires :", err));
  }, [id]);

  if (!post) return <p>Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-full max-h-96 rounded-lg my-4 object-cover" />
      <p>{post.content}</p>

      {/* Bouton Like */}
      {user && Array.isArray(post.likes) && (
        <LikeButton 
          postId={post._id} 
          initialLikes={post.likes.length} 
          isLiked={post.likes.includes(user._id)} 
          token={localStorage.getItem("token")}
        />
      )}

      <h3 className="text-2xl font-bold mt-6">Commentaires</h3>

      {/* Liste des commentaires */}
      <CommentList comments={comments} />

      {/* Formulaire de commentaire */}
      {user && post._id && (
        <CommentForm postId={post._id} token={localStorage.getItem("token")} setComments={setComments} />
      )}
    </div>
  );
};

export default PostDetail;
