import { CommentItem } from "../CommentItem/CommentItem.jsx";
import styles from "./CommentList.module.css";

export const CommentList = ({ comments, onDeleteComment }) => {
  return (
    <>
      <h3 className={styles.comments}>Комментарии</h3>
      <ul>
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} onDelete={onDeleteComment} />
        ))}
      </ul>
    </>
  );
};
