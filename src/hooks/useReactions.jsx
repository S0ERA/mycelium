// useReactions.jsx
import { useState, useEffect } from "react";

export const useReactions = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка начальных данных
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

  // Обработчик реакций
  const handleReaction = (postId, type) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        const newReactions = { ...post.reactions };
        const savedReactions =
          JSON.parse(localStorage.getItem("postReactions")) || {};

        // Логика обновления реакций
        if (newReactions.userReaction === type) {
          // Сброс реакции
          newReactions[`${type}s`] -= 1;
          newReactions.userReaction = null;
          delete savedReactions[postId];
        } else {
          // Удаление предыдущей реакции
          if (newReactions.userReaction) {
            newReactions[`${newReactions.userReaction}s`] -= 1;
          }
          // Добавление новой реакции
          newReactions[`${type}s`] += 1;
          newReactions.userReaction = type;
          savedReactions[postId] = { type };
        }

        // Сохранение в localStorage
        localStorage.setItem("postReactions", JSON.stringify(savedReactions));

        return { ...post, reactions: newReactions };
      }),
    );
  };

  return { posts, loading, handleReaction };
};
