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
      .catch((err) => console.error(err));
  }, [id]);

  if (!post) return <p>Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {/* <img src={post.image} alt={post.title} className="w-full rounded-lg my-4" /> */}
      <img src={post.image} alt={post.title} className="w-full max-h-96 rounded-lg my-4 object-cover" />
      <p>{post.content}</p>

      {user && <LikeButton postId={post._id} initialLikes={post.likes.length} isLiked={post.likes.includes(user.id)} token={user.token} />}
      
      <h3 className="text-2xl font-bold mt-6">Commentaires</h3>
      <CommentList postId={post._id} />
      {user && <CommentForm postId={post._id} token={user.token} />}
    </div>
  );
};

export default PostDetail;