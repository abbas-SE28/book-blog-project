import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { booksAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from '../Comments/CommentSection';


const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { isAdmin } = useAuth();


 useEffect(() => {
  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await booksAPI.getById(id);
      setBook(response.data);
    } catch (err) {
      setError('Failed to fetch book details in bookdetails.js');
      console.error('Error fetching book:', err);
    } finally {
      setLoading(false);
    }
  };


  fetchBook();
}, [id]);




  

  const handleDeleteBook = async () => {
    if (!window.confirm('Are you sure bro?')) {
      return;
    }


    try {
      await booksAPI.delete(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete book');
      console.error('Error deleting book:', err);
    }
  };


  const onCommentAdded = (newComment) => {
    setBook(prevBook => ({
      ...prevBook,
      comments: [...prevBook.comments, newComment]
    }));
  };


  const onCommentDeleted = (commentId) => {
    setBook(prevBook => ({
      ...prevBook,
      comments: prevBook.comments.filter(comment => comment.comment_id !== commentId)
    }));
  };


  if (loading) return <div className="loading">Loading book details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div className="error">Book not found</div>;


  return (
    <div className="book-detail">
      <div className="book-detail-header">
        <Link to="/" className="back-link">← Back to Books</Link>
        {isAdmin() && (
          <div className="admin-actions">
            <Link to={`/books/${book.book_id}/edit`} className="btn btn-secondary">
              Edit Book
            </Link>
            <button onClick={handleDeleteBook} className="btn btn-danger">
              Delete Book
            </button>
          </div>
        )}
      </div>


      <div className="book-content">
        <div className="book-main-info">
          <h1>{book.title}</h1>
          <h2 className="book-author">by {book.author}</h2>
          
          <div className="book-meta">
            <div className="meta-item">
              <strong>Category:</strong> {book.category.category_name}
            </div>
            <div className="meta-item">
              <strong>Status:</strong> {book.status}
            </div>
            <div className="meta-item">
              <strong>Date Added:</strong> {new Date(book.date_added).toLocaleDateString()}
            </div>
          </div>


          <div className="book-description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>


          {book.notes && (
            <div className="book-notes">
              <h3>Notes</h3>
              <p>{book.notes}</p>
            </div>
          )}
        </div>


        <div className="book-comments-section">
          <CommentSection
            bookId={book.book_id}
            comments={book.comments}
            onCommentAdded={onCommentAdded}
            onCommentDeleted={onCommentDeleted}
          />
        </div>
      </div>
    </div>
  );
};


export default BookDetail;
