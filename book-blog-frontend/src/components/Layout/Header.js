import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <header>
      <nav>
        <div>
          <Link to="/"> 
            <h1>Book Blog</h1>
          </Link>
        </div>


        <div>
          <Link to="/">Home</Link>
          
          {isAuthenticated() ? (
            <>
              {isAdmin() && (
                <>
                  <Link to="/books/new">Add Book</Link>
                 
                </>
              )}
              <span>Welcome, {user.name}!</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};


export default Header;
