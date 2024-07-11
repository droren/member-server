import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './MemberList.css';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5500/members', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(response.data);
    };

    fetchMembers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="member-list-page">
      <div className="sidebar">
        <Link to="/add-member">Add Member</Link>
        <Link to="/remove-member">Remove Member</Link>
        <Link to="/print-members">Print Member List</Link>
        <button onClick={handleLogout}>Exit</button>
      </div>
      <div className="main-content">
        <h1>Member List</h1>
        <div className="member-info header">
          <span className="member-number">Member Number</span>
          <span className="member-name">Name</span>
          <span className="member-phone">Phone Number</span>
          <span className="member-fee">Fee Status</span>
          <span className="member-edit">Edit</span>
        </div>
        <ul>
          {members.map(member => (
            <li key={member._id} className={member.removed ? 'removed' : ''}>
              <div className="member-info">
                <span className="member-number">{String(member.memberNumber).padStart(5, '0')}</span>
                <span className="member-name">{member.name}</span>
                <span className="member-phone">{member.phoneNumber}</span>
                <span className="member-fee">{member.feePaid ? 'Paid' : 'Unpaid'}</span>
                <Link to={`/edit-member/${member._id}`} className="edit-link">Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberList;
