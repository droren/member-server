import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';  // Import the Header component
import './styles.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header /> {/* Include the Header component */}
      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default HomePage;
