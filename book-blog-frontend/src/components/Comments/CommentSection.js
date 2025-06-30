
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {commentsAPI} from '../../services/api';


const CommentSection = ({ bookId, comments, onCommentAdded, onCommentDeleted }) => {
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, isAdmin } = useAuth();


  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;


    setLoading(true);
    setError('');


    try {
      const response = await commentsAPI.create(bookId, {
        comment_text: newComment.trim()
      });
      
      onCommentAdded(response.data);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment');
      console.error('Error adding comment:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentsAPI.delete(bookId, commentId);
        onCommentDeleted(commentId);
      } catch (err) {
        setError('Failed to delete comment');
        console.error('Error deleting comment:', err);
      }
    }
  };


  const canDeleteComment = (comment) => {
    return isAdmin() || (user && user.user_id === comment.user.user_id);
  };


  return (
    <div className="comment-section">
     
      {user ? (
        <div className="add-comment">
          <h4>Add a Comment</h4>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              rows="3"
              required
            />
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Adding...' : 'Add Comment'}
            </button>
          </form>
        </div>
      ) : (
        <div className="login-prompt">
          <p>Please log in to add comments.</p>
        </div>
      )}


   
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.comment_id} className="comment">
              <div className="comment-header">
                <div className="comment-author">
                  <strong>{comment.user.name}</strong>
                  <span className="username">@{comment.user.username}</span>
                </div>
                <div className="comment-meta">
                  <span className="comment-date">
                    {new Date(comment.date).toLocaleDateString()} at{' '}
                    {new Date(comment.date).toLocaleTimeString()}
                  </span>
                  {canDeleteComment(comment) && (
                    <button
                      onClick={() => handleDeleteComment(comment.comment_id)}
                      className="btn btn-sm btn-danger delete-comment"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <div className="comment-text">
                {comment.comment_text}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default CommentSection;




