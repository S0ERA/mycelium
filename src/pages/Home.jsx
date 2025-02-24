import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    FaHeart,
    FaThumbsDown,
    FaEye,
    FaCaretSquareDown,
    FaSquare,
    FaCheckSquare,
} from "react-icons/fa";

function Home() {
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTag, setSelectedTag] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://dummyjson.com/posts")
            .then(res => res.json())
            .then(data => {
                    const savedReactions = JSON.parse(localStorage.getItem("postReactions")) || {};
                    const postsWithReactions = data.posts.map(post => {
                        const userReaction = savedReactions[post.id]?.type || null;

                        let likes = post.reactions.likes;
                        let dislikes = post.reactions.dislikes;

                        if (userReaction === 'like') likes += 1;
                        if (userReaction === 'dislike') dislikes += 1;

                        return {
                            ...post,
                            reactions: {
                                likes,
                                dislikes,
                                userReaction
                            }
                        }

                    })
                    setPosts(postsWithReactions);

                    const allTags = [...new Set(data.posts.flatMap(post => post.tags))];
                    setTags(allTags);
                }
            )

    }, [])

    const handleReaction = (postId, newType) => {
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.id === postId) {
                    let {likes, dislikes, userReaction} = post.reactions;

                    if (userReaction === newType) {
                        if (newType === 'like') likes -= 1;
                        if (newType === 'dislike') dislikes -= 1;
                        userReaction = null;
                    } else {
                        if (userReaction === 'like') likes -= 1;
                        if (userReaction === 'dislike') dislikes -= 1;

                        if (newType === 'like') likes += 1;
                        if (newType === 'dislike') dislikes += 1;
                        userReaction = newType;
                    }

                    const savedReactions = JSON.parse(localStorage.getItem("postReactions")) || {};

                    const updatedReactions = {
                        ...savedReactions,
                        [postId]: {
                            type: userReaction,
                            likes,
                            dislikes
                        }
                    };
                    localStorage.setItem("postReactions", JSON.stringify(updatedReactions));

                    return {
                        ...post,
                        reactions: {
                            likes,
                            dislikes,
                            userReaction
                        }
                    };
                }
                return post;
            });
        });
    };

return (
    <div className="filtersContainer">
        <h1 className="titlePosts">Посты</h1>
        <div className={"tagsFilters"}>
            {tags.map(tag => (
                <button key={tag} className='tags'
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}>
                     {tag === selectedTag ? <FaCheckSquare className="icon" /> : <FaSquare className="icon" />} {tag}
                </button>
            ))}
        </div>
        <ul>
            {posts
                .filter(post => !selectedTag || post.tags.includes(selectedTag))
                .map((post) => (
                    <li key={post.id} className="post">
                        <h3 className="postTitle">{post.title}</h3>
                        <p className="postBody">{post.body}</p>
                        <div className="reactionsNavContainer">
                            <div className="reactions">
                                <button
                                    className={`reactionBtn ${post.reactions.userReaction === 'like' ? 'active' : ''}`}
                                        onClick={() => handleReaction(post.id, "like")}
                                >
                                    <FaHeart className="icon"/>
                                    {post.reactions.likes}
                                </button>
                                <button
                                    className={`reactionBtn ${post.reactions.userReaction === 'dislike' ? 'active' : ''}`}
                                    onClick={() => handleReaction(post.id, 'dislike')}
                                >
                                    <FaThumbsDown className="icon"/>
                                    {post.reactions.dislikes}
                                </button>
                                <button className="reactionBtn" onClick={() => navigate("/analytics")}>
                                <FaEye className="icon"/>
                                {post.views}
                                </button>

                            </div>

                            <button className='detailsBtn' onClick={() => navigate(`/post/${post.id}`)}>
                                Подробнее
                                <FaCaretSquareDown className="icon" />
                            </button>
                        </div>
                    </li>
                ))}
        </ul>
    </div>
)
}

export default Home;