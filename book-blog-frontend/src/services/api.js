
import axios from 'axios';


const API_BASE_URL = 'http://localhost:3000'; 


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


// Auth 
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', { user: userData }),
};


// Books 
export const booksAPI = {
  getAll: (params = {}) => api.get('/books', { params }),
  getById: (id) => api.get(`/books/${id}`),
  create: (bookData) => api.post('/books', { book: bookData }),
  update: (id, bookData) => api.put(`/books/${id}`, { book: bookData }),
  delete: (id) => api.delete(`/books/${id}`),
};


// Categories 
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (categoryData) => api.post('/categories', { category: categoryData }),
  update: (id, categoryData) => api.put(`/categories/${id}`, { category: categoryData }),
  delete: (id) => api.delete(`/categories/${id}`),
};


// Comments 
export const commentsAPI = {
  create: (bookId, commentData) => api.post(`/books/${bookId}/comments`, { comment: commentData }),
  delete: (bookId, commentId) => api.delete(`/books/${bookId}/comments/${commentId}`),
};


export default api;


