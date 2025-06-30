import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Layout/ProtectedRoute';


// Auth
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


// Book 
import BookList from './components/Books/BookList';
import BookDetail from './components/Books/BookDetail';
import BookForm from './components/Books/BookForm';


// Category 
import CategoryForm from './components/Layout/CategoryForm';




function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* public rroutes */}
            <Route path="/" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


           
            <Route 
              path="/books/new" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <BookForm isEdit={false}/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/books/:id/edit" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <BookForm isEdit={true}/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/categories" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <CategoryForm />
                </ProtectedRoute>
              } 
            />


            
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}


export default App;






