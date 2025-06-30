import React from 'react';
import Header from './Header';


const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2025 Book Blog. All rights saved to Abbas.</p>
      </footer>
    </div>
  );
};


export default Layout;






