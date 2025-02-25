import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommentList } from "../../components/Comments/CommentList.jsx";
import { CommentForm } from "../../components/Comments/CommentForm.jsx";
import { PostCard } from "../../components/PostCard.jsx";
import { useReactions } from "../../hooks/useReactions.jsx";

function PostPage() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const { posts, loading, handleReaction } = useReactions();
  const post = posts.find((p) => p.id === Number(id));

  const STORAGE_KEY = `post_${id}_comments`;

  useEffect(() => {
    if (!post) return;

    fetch(`https://dummyjson.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((serverComments) => {
        const savedComments =
          JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        setComments([...savedComments, ...serverComments.comments]);
      });
  }, [id, post]);

  const handleAddNewComment = (commentText) => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));

    const comment = {
      id: Date.now(),
      body: commentText,
      postId: id,
      user: {
        id: userData?.email,
        username: userData?.name,
        fullName: userData?.name,
      },
      isMine: true,
    };

    setComments((prev) => {
      const newComments = [comment, ...prev];
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(newComments.filter((c) => c.isMine)),
      );
      return newComments;
    });
  };

  const handleDeleteComment = (commentId) => {
    setComments((prev) => {
      const newComments = prev.filter((c) => c.id !== commentId);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(newComments.filter((c) => c.isMine)),
      );
      return newComments;
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="postAndComms">
      <PostCard
        post={post}
        showDetailsButton={false}
        onReaction={handleReaction}
      />
      <CommentList comments={comments} onDeleteComment={handleDeleteComment} />
      <CommentForm onSubmit={handleAddNewComment} />
    </div>
  );
}

export default PostPage;
