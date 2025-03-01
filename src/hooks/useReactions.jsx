import { useState, useEffect } from "react";

export const useReactions = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();
        const savedReactions =
          JSON.parse(localStorage.getItem("postReactions")) || {};

        const processedPosts = data.posts.map((post) => {
          const reaction = savedReactions[post.id] || {};
          return {
            ...post,
            reactions: {
              likes: post.reactions.likes + (reaction.type === "like" ? 1 : 0),
              dislikes:
                post.reactions.dislikes + (reaction.type === "dislike" ? 1 : 0),
              userReaction: reaction.type || null,
            },
          };
        });

        setPosts(processedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleReaction = (postId, type) => {
    setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id !== postId) return post;

          const newReactions = { ...post.reactions };
          const savedReactions =
              JSON.parse(localStorage.getItem("postReactions")) || {};

          if (newReactions.userReaction === type) {
            newReactions[`${type}s`] -= 1;
            newReactions.userReaction = null;

            const updatedReactions = Object.keys(savedReactions).reduce(
                (acc, key) => {
                  if (key !== postId.toString()) {
                    acc[key] = savedReactions[key];
                  }
                  return acc;
                },
                {}
            );
            localStorage.setItem("postReactions", JSON.stringify(updatedReactions));
          } else {

            if (newReactions.userReaction) {
              newReactions[`${newReactions.userReaction}s`] -= 1;
            }
            newReactions[`${type}s`] += 1;
            newReactions.userReaction = type;

            const updatedReactions = { ...savedReactions, [postId]: { type } };
            localStorage.setItem("postReactions", JSON.stringify(updatedReactions));
          }

          return { ...post, reactions: newReactions };
        }),
    );
  };

  return { posts, loading, handleReaction };
};