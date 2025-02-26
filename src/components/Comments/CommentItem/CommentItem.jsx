import { FaTrashAlt } from "react-icons/fa";
import styles from "./CommentItem.module.css";

export const CommentItem = ({ comment, onDelete }) => {
  return (
    <li className={styles.commentItem}>
      <div className={styles.commentContent}>
        <strong>{comment.user.username}: </strong>
        <span>{comment.body}</span>
        {comment.isMine && (
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(comment.id)}
          >
            <FaTrashAlt className="icon" />
          </button>
        )}
      </div>
    </li>
  );
};
