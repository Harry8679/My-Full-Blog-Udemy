import { useEffect, useState } from "react";
import API from "../api";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.get(`/comments/${postId}`)
      .then((res) => {
        console.log("Commentaires récupérés :", res.data);
        setComments(res.data);
      })
      .catch((err) => console.error("Erreur lors de la récupération des commentaires :", err));
  }, [postId]);

  return (
    <div className="mt-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="border p-2 my-2 rounded">
            <p className="text-sm text-gray-600">{comment.userId.username}</p>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>Aucun commentaire pour le moment.</p>
      )}
    </div>
  );
};

export default CommentList;