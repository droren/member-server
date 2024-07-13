import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './RegisterUser.css';

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5500'}/register`, { username, password });
      alert('User registered successfully');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <div className="register-user-page">
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="form-actions">
          <button type="submit">Register User</button>
          <button type="button" onClick={() => navigate('/login')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
