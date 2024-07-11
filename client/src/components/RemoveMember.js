import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const RemoveMember = () => {
  const [memberNumber, setMemberNumber] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5500/members/${memberNumber}`, { removed: true, reason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/members');
    } catch (err) {
      console.error(err);
      alert('Error removing member');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="remove-member-form">
      <div>
        <label>Member Number</label>
        <input type="text" value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} required />
      </div>
      <div>
        <label>Reason for Removing</label>
        <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />
      </div>
      <button type="submit">Remove Member</button>
    </form>
  );
};

export default RemoveMember;
