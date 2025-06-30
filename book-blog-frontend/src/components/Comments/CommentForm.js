import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';


const CommentForm = ({ bookId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;


    setLoading(true);
    setError('');


    try {
      await apiService.createComment(bookId, { 
        comment_text: commentText 
      });
      setCommentText('');
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  if (!isAuthenticated()) {
    return (
      <div>
        <p>Please log in the website to add a comment.</p>
      </div>
    );
  }


  return (
    <div>
      <h3>Add a Comment</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment here..."
            rows="4"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
};


export default CommentForm;
