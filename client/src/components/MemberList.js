import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

const MemberList = () => {
  const [members, setMembers] = useState([]);

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

  return (
    <div className="member-list-page">
      <div className="menu">
        <Link to="/add-member">Add Member</Link>
        <Link to="/remove-member">Remove Member</Link>
        <Link to="/print-members">Print Member List</Link>
      </div>
      <div className="main-canvas">
        <h1>Member List</h1>
        <ul>
          {members.map(member => (
            <li key={member._id}>
              {member.memberNumber} - {member.name} - {member.feePaid ? 'Paid' : 'Not Paid'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberList;
