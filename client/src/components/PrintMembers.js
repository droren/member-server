import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';  // Import the Header component
import './PrintMembers.css';

const PrintMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5500'}/members`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMembers(response.data);
      } catch (err) {
        console.error(err);
        alert('Error fetching members');
      }
    };

    fetchMembers();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="printable-member-list">
      <Header /> {/* Include the Header component */}
      <div className="member-info header">
        <span className="member-number">Member Number</span>
        <span className="member-name">First Name</span>
        <span className="member-name">Last Name</span>
        <span className="member-birthday">Birthday</span>
        <span className="member-phone">Phone Number</span>
      </div>
      <ul>
        {members.map(member => (
          <li key={member._id}>
            <div className="member-info">
              <span className="member-number">{String(member.memberNumber).padStart(5, '0')}</span>
              <span className="member-name">{member.firstName}</span>
              <span className="member-name">{member.lastName}</span>
              <span className="member-birthday">{formatDate(member.birthday)}</span>
              <span className="member-phone">{member.phoneNumber}</span>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => window.print()}>Print</button>
    </div>
  );
};

export default PrintMembers;
