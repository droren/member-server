import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';  // Import the Header component
import './RemoveMember.css';

const RemoveMember = () => {
  const [memberNumber, setMemberNumber] = useState('');
  const [removalReason, setRemovalReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5500/members', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const member = response.data.find(m => m.memberNumber === memberNumber);
      if (member) {
        await axios.put(`http://localhost:5500/members/${member._id}`, {
          removed: true,
          removalReason
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/members');
      } else {
        alert('Member not found');
      }
    } catch (err) {
      console.error(err);
      alert('Error removing member');
    }
  };

  return (
    <div className="remove-member-page">
      <Header /> {/* Include the Header component */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Member Number</label>
          <input type="text" value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} required />
        </div>
        <div>
          <label>Removal Reason</label>
          <input type="text" value={removalReason} onChange={(e) => setRemovalReason(e.target.value)} required />
        </div>
        <button type="submit">Remove Member</button>
        <button type="button" onClick={() => navigate('/members')}>Cancel</button>
      </form>
    </div>
  );
};

export default RemoveMember;
