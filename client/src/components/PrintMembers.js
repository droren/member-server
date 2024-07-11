import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PrintMembers.css';

const PrintMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5500/members', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(response.data.filter(member => !member.removed));
    };

    fetchMembers();
  }, []);

  return (
    <div className="printable-member-list">
      <h1>Printable Member List</h1>
      <div className="member-info header">
        <span className="member-number">Member Number</span>
        <span className="member-name">First Name</span>
        <span className="member-name">Last Name</span>
        <span className="member-phone">Phone Number</span>
        <span className="member-fee">Fee Status</span>
      </div>
      <ul>
        {members.map(member => (
          <li key={member._id}>
            <div className="member-info">
              <span className="member-number">{String(member.memberNumber).padStart(5, '0')}</span>
              <span className="member-name">{member.firstName}</span>
              <span className="member-name">{member.lastName}</span>
              <span className="member-phone">{member.phoneNumber}</span>
              <span className="member-fee">{member.feePaid ? 'Paid' : 'Unpaid'}</span>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => window.print()}>Print</button>
    </div>
  );
};

export default PrintMembers;
