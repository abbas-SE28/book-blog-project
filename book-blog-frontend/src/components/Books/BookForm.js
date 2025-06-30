import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { booksAPI, categoriesAPI } from '../../services/api';


const BookForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();


  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    notes: '',
    status: 'still reading',
    category_id: ''
  });


  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);


 useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data || []);
    } catch (err) {
      console.error('Error fetching categories in bookfrom.js:', err);
      setErrors(['Failed to load categories']);
    }
  };


  const fetchBook = async () => {
    try {
      const response = await booksAPI.getById(id);
      const book = response.data;
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description,
        notes: book.notes || '',
        status: book.status,
        category_id: book.category?.id?.toString() || ''
      });
    } catch (err) {
      console.error('Error fetching book in bookform.js bro:', err);
      setErrors(['Failed to fetch book details']);
    }
  };


  fetchCategories();


  if (isEdit && id) {
    fetchBook();
  }
}, [isEdit, id]);






 


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);


    if (!formData.category_id) {
      setErrors(['Please select a category']);
      setLoading(false);
      return;
    }


    const categoryId = Number(formData.category_id);
    


    const payload = { ...formData, category_id: categoryId, status: formData.status
     };


    try {
      if (isEdit) {
        await booksAPI.update(id, payload);
        navigate(`/books/${id}`);
      } else {
        const response = await booksAPI.create(payload);
    
        const newBookId = response.data.book_id || response.data.id;
        navigate(`/books/${newBookId}`);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      const apiErrors = err.response?.data?.errors || ['Failed to save book'];
      setErrors(Array.isArray(apiErrors) ? apiErrors : [apiErrors]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="book-form-container">
      <h2>{isEdit ? 'Edit Book' : 'Add New Book'}</h2>


      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <div key={idx} className="error-message">{error}</div>
          ))}
        </div>
      )}


      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="category_id">Category:</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Still_reading">Still reading</option>
            <option value="Finshed_reading">Finshed reading</option>
            
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="notes">Notes (Optional Bro):</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>


        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? (isEdit ? 'Updating...' : 'Saving...') : (isEdit ? 'Update Book' : 'Add Book')}
          </button>
          <button
            type="button"
            onClick={() => navigate(isEdit ? `/books/${id}` : '/')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


export default BookForm;




