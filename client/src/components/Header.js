import React from 'react';
import './Header.css';

const Header = () => {
  const headerText = process.env.REACT_APP_HEADER_TEXT || 'Uppdatera med föreningens namn';
  return (
    <header className="app-header">
      <h1>{headerText}</h1>
    </header>
  );
};

export default Header;
