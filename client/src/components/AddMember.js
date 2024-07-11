import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const AddMember = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [group, setGroup] = useState('');
  const [feePaid, setFeePaid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5500/members', {
        name,
        birthday,
        contactInfo,
        phoneNumber,
        group,
        feePaid
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/members');
    } catch (err) {
      console.error(err);
      alert('Error adding member');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-member-form">
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Birthday</label>
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
      </div>
      <div>
        <label>Contact Information</label>
        <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />
      </div>
      <div>
        <label>Phone Number</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>
      <div>
        <label>Group</label>
        <input type="text" value={group} onChange={(e) => setGroup(e.target.value)} />
      </div>
      <div>
        <label>Fee Paid</label>
        <input type="checkbox" checked={feePaid} onChange={(e) => setFeePaid(e.target.checked)} />
      </div>
      <button type="submit">Add Member</button>
    </form>
  );
};

export default AddMember;
