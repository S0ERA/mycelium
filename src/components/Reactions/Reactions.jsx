import { FaHeart, FaThumbsDown, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Reactions.module.css";

export const Reactions = ({ reactions, postId, views, handleReaction }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.reactions}>
      <button
        className={`${styles.reactionBtn} ${reactions.userReaction === "like" ? styles.active : ""}`}
        onClick={() => handleReaction(postId, "like")}
      >
        <FaHeart className="icon" />
        {reactions.likes}
      </button>
      <button
        className={`${styles.reactionBtn} ${reactions.userReaction === "dislike" ? styles.active : ""}`}
        onClick={() => handleReaction(postId, "dislike")}
      >
        <FaThumbsDown className="icon" />
        {reactions.dislikes}
      </button>
      <button
        className={styles.reactionBtn}
        onClick={() => navigate("/analytics")}
      >
        <FaEye className="icon" />
        {views}
      </button>
    </div>
  );
};
