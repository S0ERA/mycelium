import { CommentItem } from "./CommentItem";

export const CommentList = ({ comments, onDeleteComment }) => {
  return (
    <>
      <h3 className="comments">Комментарии</h3>
      <ul>
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} onDelete={onDeleteComment} />
        ))}
      </ul>
    </>
  );
};
