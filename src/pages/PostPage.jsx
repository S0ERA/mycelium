import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function PostPage() {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const STORAGE_KEY = `post_${id}_comments`;

    useEffect(() => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(setPost);

        fetch(`https://dummyjson.com/posts/${id}/comments`)
            .then(res => res.json())
            .then(serverComments => {
                const savedComments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
                setComments([...savedComments, ...serverComments.comments]);
            });
    }, [id]);

    if (!post) return <p>Загрузка...</p>

    const handleAddNewComment = () => {
        if (newComment.trim().length > 0) {
            const userData = JSON.parse(localStorage.getItem("user"));

            const comment = {
                id: Date.now(),
                body: newComment,
                postId: post.id,
                user: {
                    id: userData?.email,
                    username: userData?.name,
                    fullName: userData?.name,
        },
                isMine: true,
            }

            setComments(prev => {
                const newComments = [comment, ...prev];
                localStorage.setItem(STORAGE_KEY,
                    JSON.stringify(newComments.filter(c => c.isMine)));
                return newComments;
            });

            setNewComment('');
        }
    }

    const handleDeleteComment = (commentId) => {
        setComments(prev => {
            const newComments = prev.filter(c => c.id !== commentId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newComments.filter(c => c.isMine)));
            return newComments;
        })
    }


    return (
        <div className="post">
            <h1 className="postTitle">{post.title}</h1>
            <p className="postBody">{post.body}</p>
            <h3 className="comments">Комментарии</h3>
            <ul>
                {comments.map(c => (
                    <li key={c.id} className="commentItem">
                        <div className="commentContent">
                            <strong>{c.user.username}: </strong>
                            <span>{c.body}</span>
                            {c.isMine && (
                                <button className="deleteBtn"
                                        onClick={() => handleDeleteComment(c.id)}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </li>))}
            </ul>
            <div className="sendComments">
                <input
                    className="commentInput"
                    type="text"
                    placeholder="Оставьте свой комментарий"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNewComment()}
                />
                <button className="buttonComms"
                        onClick={handleAddNewComment}
                >
                    Отправить
                </button>
            </div>
        </div>
    )
}

export default PostPage;