import React, { useState, useEffect } from 'react';
import { categoriesAPI } from '../../services/api';


const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    fetchCategories();
  }, []);


  const fetchCategories = async () => {
    try {
      const data = await categoriesAPI.getCategories();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;


    setLoading(true);
    setError('');


    try {
      await categoriesAPI.createCategory({ category_name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <h2>Manage Categories</h2>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Category Name:
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>


      <div>
        <h3>Existing Categories</h3>
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                {category.category_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


export default CategoryForm;
