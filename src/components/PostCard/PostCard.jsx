import { BiMessageSquareDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Reactions } from "../Reactions/Reactions.jsx";
import styles from "./PostCard.module.css";

export const PostCard = ({ post, showDetailsButton = true, onReaction }) => {
  const navigate = useNavigate();

  return (
    <>
      <h3 className={styles.postTitle}>{post.title}</h3>
      <p className={styles.postBody}>{post.body}</p>

      <div className={styles.reactionsNavContainer}>
        <Reactions
          reactions={post.reactions}
          postId={post.id}
          handleReaction={onReaction}
          views={post.views}
        />

        {showDetailsButton && (
          <button
            className={styles.detailsBtn}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            Подробнее
            <BiMessageSquareDetail className="icon" />
          </button>
        )}
      </div>
    </>
  );
};
