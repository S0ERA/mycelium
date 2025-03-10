import { useState } from "react";
import { Filters } from "../../components/Filters/Filters.jsx";
import { PostList } from "../../components/PostList/PostList.jsx";
import { useReactions } from "../../hooks/useReactions";
import styles from "./Home.module.css";

function Home() {
    const { posts, loading, handleReaction } = useReactions();
    const [selectedTags, setSelectedTags] = useState([]);

    const filteredPosts = posts.filter(
        (post) =>
            selectedTags.length === 0 ||
            selectedTags.every((tag) => post.tags.includes(tag)),
    );

    if (loading) return <div className="loading">Загрузка...</div>;

    return (
        <div className={styles.mainContainer}>
            <Filters onFilterChange={setSelectedTags} />

            <div className={styles.postsContainer}>
                <PostList posts={filteredPosts} onReaction={handleReaction} />
            </div>
        </div>
    );
}

export default Home;