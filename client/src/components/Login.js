import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Login.css';
import { getClientIP } from '../utils/getClientIP';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clientIP, setClientIP] = useState('localhost');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientIP = async () => {
      const ip = await getClientIP();
      setClientIP(ip);
    };

    fetchClientIP();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${clientIP}:5500/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/members');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
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
        <div className="form-actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
