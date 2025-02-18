const CommentList = ({ comments }) => {
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
