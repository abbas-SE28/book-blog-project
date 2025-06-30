import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { booksAPI, categoriesAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category_id: '',
    status: ''
  });
  
  const { isAdmin } = useAuth();


  useEffect(() => {
    const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await booksAPI.getAll(filters);
      setBooks(response.data);
    } catch (err) {
      setError('failed to fetch BOOKs the issue in booklist.js');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };
    fetchBooks();
    fetchCategories();
  }, [filters]);


  

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div className="loading">Loading books...please wait bro</div>;
  if (error) return <div className="error">{error}</div>;


  return (
    <div className="book-list">
      <div className="book-list-header">
        <h2>Books</h2>
       
      </div>


      <div className="filters">
        <div className="filter-group">
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            name="category_id"
            value={filters.category_id}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>


        <div className="filter-group">
          <label htmlFor="status">Filter by Status:</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="Still_reading">Still rading</option>
            <option value="Finshed_reading">Finshed reading</option>
           
          </select>
        </div>
      </div>


      <div className="books-grid">
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map(book => (
            <div key={book.book_id} className="book-card">
              <div className="book-info">
                <h3>
                  <Link to={`/books/${book.book_id}`}>
                    {book.title}
                  </Link>
                </h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-category">Category: {book.category}</p>
                <p className="book-status">Status: {book.status}</p>
                <p className="book-comments">Comments: {book.comments_count}</p>
                <p className="book-date">Added: {new Date(book.date_added).toLocaleDateString()}</p>
              </div>
              
            
            </div>
          ))
        )}
      </div>
    </div>
  );
};

    export default BookList;
