import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LikeButton from "../components/LikeButton";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const PostDetail = ({ user }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4400/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Erreur de récupération du post :", err));
  }, [id]);

  if (!post) return <p>Chargement...</p>;

  console.log("📌 Post récupéré :", post);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-full max-h-96 rounded-lg my-4 object-cover" />
      <p>{post.content}</p>

      {user && post.likes && (
        <LikeButton 
          postId={post._id} 
          initialLikes={post.likes.length} 
          isLiked={post.likes.includes(user._id)} 
          token={localStorage.getItem("token")}
        />
      )}

      <h3 className="text-2xl font-bold mt-6">Commentaires</h3>
      {post._id ? <CommentList postId={post._id} /> : <p>Aucun commentaire disponible</p>}
      {user && <CommentForm postId={post._id} token={localStorage.getItem("token")} />}
    </div>
  );
};

export default PostDetail;