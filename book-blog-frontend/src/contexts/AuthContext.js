import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';  


const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');


    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

const performLogin = async (email, password) => {
  try {
    const response = await authAPI.login(email, password);
    login(response.data.user, response.data.token); 
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response?.data?.errors || ['Login failed'] };
  }
};



  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };


  
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      login(response.data.user, response.data.token); 
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.errors || ['Registration failed'] };
    }
  };


  const isAdmin = () => {
    return user && user.role === 'admin';
  };


  const isAuthenticated = () => {
    return !!token && !!user;
  };


  const value = {
    user,
    token,
    login:performLogin,
    logout,
    register,       
    isAdmin,
    isAuthenticated,
    loading,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
