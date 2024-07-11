import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const PrintMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5500/members', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const activeMembers = response.data.filter(member => !member.removed);
      setMembers(activeMembers);
    };

    fetchMembers();
  }, []);

  return (
    <div className="print-members-page">
      <h1>Printable Member List</h1>
      <ul>
        {members.map(member => (
          <li key={member._id}>
            {member.memberNumber} - {member.name} - {member.feePaid ? 'Paid' : 'Not Paid'}
          </li>
        ))}
      </ul>
      <button onClick={() => window.print()}>Print</button>
    </div>
  );
};

export default PrintMembers;
