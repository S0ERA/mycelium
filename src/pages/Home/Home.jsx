// Home.jsx
import { useState } from "react";
import { Filters } from "../../components/Filters";
import { PostCard } from "../../components/PostCard";
import { useReactions } from "../../hooks/useReactions";

function Home() {
  const { posts, loading, handleReaction } = useReactions();
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredPosts = posts.filter(
    (post) =>
      selectedTags.length === 0 ||
      selectedTags.every((tag) => post.tags.includes(tag)),
  );

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="mainContainer">
      <Filters onFilterChange={setSelectedTags} />

      <div className="postsContainer">
        {filteredPosts.length === 0 ? (
          <p className="noResults">Ничего не найдено</p>
        ) : (
          <ul className="postList">
            {filteredPosts.map((post) => (
              <li className="post" key={post.id}>
                <PostCard post={post} onReaction={handleReaction} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
