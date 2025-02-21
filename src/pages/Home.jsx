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
        <div>
            <h1>Посты</h1>
            <div className={"tagsFilters"}>
                {tags.map(tag => (
                    <button key={tag.id} className='tags' onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}>
                        {tag} {tag === selectedTag ? "☑️" : ""}
                    </button>
                ))}
            </div>
            <ul>
                {posts
                    .filter(post => !selectedTag || post.tags.includes(selectedTag))
                    .map((post) => (
                        <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p className="postBody">{post.body}</p>
                            <p>❤️ {post.reactions.likes} 👎🏻 {post.reactions.dislikes} 👀 {post.views}</p>
                            <button onClick={() => navigate(`/post/${post.id}`)}>Подробнее</button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Home;