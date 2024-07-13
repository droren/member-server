import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './AddMember.css';

const AddMember = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalNumber, setPostalNumber] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [group, setGroup] = useState('');
  const [feePaid, setFeePaid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5500'}/members`, {
        firstName,
        lastName,
        birthday,
        streetAddress,
        postalNumber,
        city,
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
    <div className="add-member-page">
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Birthday</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Postal Number</label>
          <input type="text" value={postalNumber} onChange={(e) => setPostalNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Group</label>
          <input type="text" value={group} onChange={(e) => setGroup(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Fee Paid</label>
          <input type="checkbox" checked={feePaid} onChange={(e) => setFeePaid(e.target.checked)} />
        </div>
        <div className="form-actions">
          <button type="submit">Add Member</button>
          <button type="button" onClick={() => navigate('/members')}>Cancel</button>
        </div>
      </form>
      <div className="gdpr-note">
        <p>
          By submitting this form, you agree to the storage and handling of your data in accordance with GDPR regulations.
        </p>
        <button onClick={() => navigate('/gdpr')}>GDPR Information</button>
      </div>
    </div>
  );
};

export default AddMember;
