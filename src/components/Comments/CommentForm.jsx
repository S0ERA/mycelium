import { useState } from "react";

export const CommentForm = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (newComment.trim()) {
      onSubmit(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="sendComments">
      <input
        className="commentInput"
        type="text"
        placeholder="Оставьте свой комментарий"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button className="buttonComms" onClick={handleSubmit}>
        Отправить
      </button>
    </div>
  );
};
