import { useState } from "react";
import API from "../api";

const CommentForm = ({ postId, token }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post(`/comments/${postId}`, { content }, { headers: { Authorization: `Bearer ${token}` } });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className="input"></textarea>
      <button type="submit" className="btn">Commenter</button>
    </form>
  );
};

export default CommentForm;