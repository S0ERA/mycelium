import { useState } from "react";
import styles from "./CommentForm.module.css";

export const CommentForm = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    if (e && e.key !== "Enter" && e.type !== "click") return;

    e?.preventDefault();

    if (newComment.trim()) {
      onSubmit(newComment);
      setNewComment("");
    }
  };

  return (
    <div className={styles.sendComments}>
      <input
        className={styles.commentInput}
        type="text"
        placeholder="Оставьте свой комментарий"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyPress={handleSubmit}
      />
      <button className={styles.buttonComms} onClick={handleSubmit}>
        Отправить
      </button>
    </div>
  );
};
