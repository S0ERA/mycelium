import { PostCard } from "../PostCard/PostCard.jsx";
import styles from "./PostList.module.css";

export const PostList = ({ posts, onReaction }) => {
    if (posts.length === 0) {
        return <p className="noResults">Ничего не найдено</p>;
    }

    return (
        <ul className={styles.postList}>
            {posts.map((post) => (
                <li className={styles.post} key={post.id}>
                    <PostCard post={post} onReaction={onReaction} />
                </li>
            ))}
        </ul>
    );
};