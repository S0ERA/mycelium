import { FaHeart, FaThumbsDown, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Reactions = ({ reactions, postId, views, handleReaction }) => {
  const navigate = useNavigate();

  return (
    <div className="reactions">
      <button
        className={`reactionBtn ${reactions.userReaction === "like" ? "active" : ""}`}
        onClick={() => handleReaction(postId, "like")}
      >
        <FaHeart className="icon" />
        {reactions.likes}
      </button>
      <button
        className={`reactionBtn ${reactions.userReaction === "dislike" ? "active" : ""}`}
        onClick={() => handleReaction(postId, "dislike")}
      >
        <FaThumbsDown className="icon" />
        {reactions.dislikes}
      </button>
      <button className="reactionBtn" onClick={() => navigate("/analytics")}>
        <FaEye className="icon" />
        {views}
      </button>
    </div>
  );
};
