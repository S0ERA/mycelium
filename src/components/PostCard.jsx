import { BiMessageSquareDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Reactions } from "./Reactions";

export const PostCard = ({ post, showDetailsButton = true, onReaction }) => {
  const navigate = useNavigate();

  return (
    <>
      <h3 className="postTitle">{post.title}</h3>
      <p className="postBody">{post.body}</p>

      <div className="reactionsNavContainer">
        <Reactions
          reactions={post.reactions}
          postId={post.id}
          handleReaction={onReaction}
          views={post.views}
        />

        {showDetailsButton && (
          <button
            className="detailsBtn"
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
