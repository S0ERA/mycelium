import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {BiMessageSquareDetail} from "react-icons/bi";
import {
  FaHeart,
  FaThumbsDown,
  FaEye,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

function Home() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        const savedReactions =
          JSON.parse(localStorage.getItem("postReactions")) || {};
        const postsWithReactions = data.posts.map((post) => {
          const userReaction = savedReactions[post.id]?.type || null;

          let likes = post.reactions.likes;
          let dislikes = post.reactions.dislikes;

          if (userReaction === "like") likes += 1;
          if (userReaction === "dislike") dislikes += 1;

          return {
            ...post,
            reactions: {
              likes,
              dislikes,
              userReaction,
            },
          };
        });
        setPosts(postsWithReactions);

        const allTags = [...new Set(data.posts.flatMap((post) => post.tags))];
        setTags(allTags);
      });
  }, []);

  const handleTagSelect = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const resetFilters = () => {
    setSelectedTags([]);
    setIsFiltersOpen(false);
  };

  const handleReaction = (postId, newType) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          let { likes, dislikes, userReaction } = post.reactions;

          if (userReaction === newType) {
            if (newType === "like") likes -= 1;
            if (newType === "dislike" + "") dislikes -= 1;
            userReaction = null;
          } else {
            if (userReaction === "like") likes -= 1;
            if (userReaction === "dislike") dislikes -= 1;

            if (newType === "like") likes += 1;
            if (newType === "dislike") dislikes += 1;
            userReaction = newType;
          }

          const savedReactions =
            JSON.parse(localStorage.getItem("postReactions")) || {};
          const updatedReactions = {
            ...savedReactions,
            [postId]: {
              type: userReaction,
              likes,
              dislikes,
            },
          };
          localStorage.setItem(
            "postReactions",
            JSON.stringify(updatedReactions),
          );

          return {
            ...post,
            reactions: {
              likes,
              dislikes,
              userReaction,
            },
          };
        }
        return post;
      });
    });
  };

  const filteredPosts = posts.filter(
    (post) =>
      selectedTags.length === 0 ||
      selectedTags.every((tag) => post.tags.includes(tag)),
  );

  return (
    <div className="mainContainer">
      <div className="filtersContainer">
        <div className="filtersDropdown">
          <button
            className="dropdownToggle"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <FaFilter /> Фильтры{" "}
            {selectedTags.length > 0 && `(${selectedTags.length})`}
          </button>

          {isFiltersOpen && (
            <div className="dropdownContent">
              <div className="tagsList">
                {tags.map((tag) => (
                  <label
                    key={tag}
                    className={`tagItem ${selectedTags.includes(tag) ? "selected" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagSelect(tag)}
                      hidden
                    />
                    {tag}
                    {selectedTags.includes(tag) && (
                      <FaTimes className="removeIcon" />
                    )}
                  </label>
                ))}
              </div>
              <button className="resetButton" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="postsContainer">
        {filteredPosts.length === 0 ? (
          <p className="noResults">Ничего не найдено</p>
        ) : (
          <ul className="postList">
            {filteredPosts.map((post) => (
              <li key={post.id} className="post">
                <h3 className="postTitle">{post.title}</h3>
                <p className="postBody">{post.body}</p>
                <div className="reactionsNavContainer">
                  <div className="reactions">
                    <button
                      className={`reactionBtn ${post.reactions.userReaction === "like" ? "active" : ""}`}
                      onClick={() => handleReaction(post.id, "like")}
                    >
                      <FaHeart className="icon" />
                      {post.reactions.likes}
                    </button>
                    <button
                      className={`reactionBtn ${post.reactions.userReaction === "dislike" ? "active" : ""}`}
                      onClick={() => handleReaction(post.id, "dislike")}
                    >
                      <FaThumbsDown className="icon" />
                      {post.reactions.dislikes}
                    </button>
                    <button
                      className="reactionBtn"
                      onClick={() => navigate("/analytics")}
                    >
                      <FaEye className="icon" />
                      {post.views}
                    </button>
                  </div>
                  <button
                    className="detailsBtn"
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    Подробнее
                    <BiMessageSquareDetail className="icon" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
