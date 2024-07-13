import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './RemoveMember.css';

const RemoveMember = () => {
  const [memberNumber, setMemberNumber] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5500'}/members`, {
        data: { memberNumber, reason },
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/members');
    } catch (err) {
      console.error(err);
      alert('Error removing member');
    }
  };

  return (
    <div className="remove-member-page">
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Member Number</label>
          <input type="text" value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Reason for Removal</label>
          <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />
        </div>
        <div className="form-actions">
          <button type="submit">Remove Member</button>
          <button type="button" onClick={() => navigate('/members')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default RemoveMember;
