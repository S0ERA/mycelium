import { FaTrashAlt } from "react-icons/fa";

export const CommentItem = ({ comment, onDelete }) => {
  return (
    <li className="commentItem">
      <div className="commentContent">
        <strong>{comment.user.username}: </strong>
        <span>{comment.body}</span>
        {comment.isMine && (
          <button className="deleteBtn" onClick={() => onDelete(comment.id)}>
            <FaTrashAlt className="icon" />
          </button>
        )}
      </div>
    </li>
  );
};
