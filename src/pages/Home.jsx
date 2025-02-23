import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTag, setSelectedTag] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://dummyjson.com/posts")
            .then(res => res.json())
            .then(data => {
                    setPosts(data.posts);
                    const allTags = [...new Set(data.posts.flatMap(post => post.tags))];
                    setTags(allTags);
                }
            )
    }, [])

    return (
        <div className="filtersContainer">
            <h1 className="titlePosts">Посты</h1>
            <div className={"tagsFilters"}>
                {tags.map(tag => (
                    <button key={tag.id} className='tags'
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}>
                        {tag} {tag === selectedTag ? "☑️" : ""}
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
                                <p>❤️ {post.reactions.likes} 👎🏻 {post.reactions.dislikes} 👀 {post.views}</p>
                                <button onClick={() => navigate(`/post/${post.id}`)}>Подробнее</button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Home;