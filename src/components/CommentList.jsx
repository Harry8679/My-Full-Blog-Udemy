import { useEffect, useState } from "react";
import API from "../api";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.get(`/comments/${postId}`).then((res) => setComments(res.data));
  }, [postId]);

  return (
    <div>
      {comments.map((comment) => (
        <p key={comment._id}>{comment.content}</p>
      ))}
    </div>
  );
};

export default CommentList;