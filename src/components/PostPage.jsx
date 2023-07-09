import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = postResponse.data;
        setPost(post);

        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
        const user = userResponse.data;
        toast.info(`Открыт пост автора: ${user.name}`);
        setUser(user);

        const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const comments = commentsResponse.data;
        setComments(comments);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [postId]);


  const handleCommentChange = e => {
    const { name, value } = e.target;
    setNewComment(prevComment => ({ ...prevComment, [name]: value }));
  };

  const handleSubmitComment = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
        postId,
        ...newComment
      });

      const comment = response.data;
      setComments(prevComments => [comment, ...prevComments]);

      setNewComment({ name: '', email: '', body: '' });
      toast.success('Комментарий добавлен');
      console.log('Отправлено');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ошибка при добавлении комментария');
    }
  };

  if (!post || !user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container">
      <div className="mt-4">
        <Link to="/" className="btn btn-secondary mb-4">
          <i className="bi bi-arrow-left"></i> Назад
        </Link>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">{post.title}</h1>
              <p className="card-text">{post.body}</p>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Автор: {user.name}</h2>
              <p className="card-text">
                <strong>Почта:</strong> {user.email}
              </p>
              <p className="card-text">
                <strong>Телефон:</strong> {user.phone}
              </p>
              <p className="card-text">
                <strong>Личный сайт:</strong> {user.website}
              </p>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title">Комментарии:</h3>
              {comments.map(comment => (
                <div className="card my-2" key={comment.id}>
                  <div className="card-body">
                    <h5 className="card-title">{comment.name}</h5>
                    <p className="card-text">{comment.body}</p>
                    <p className="card-text">
                      <strong>Почта:</strong> {comment.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4>Добавить комментарий:</h4>
              <form onSubmit={handleSubmitComment}>
                <div className="mb-3">
                  <label htmlFor="commentName" className="form-label">
                    Имя
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="commentName"
                    name="name"
                    value={newComment.name}
                    onChange={handleCommentChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="commentEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="commentEmail"
                    name="email"
                    value={newComment.email}
                    onChange={handleCommentChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="commentBody" className="form-label">
                    Комментарий
                  </label>
                  <textarea
                    className="form-control"
                    id="commentBody"
                    name="body"
                    rows={3}
                    value={newComment.body}
                    onChange={handleCommentChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Добавить
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
