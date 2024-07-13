import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';  // Import the Header component
import './EditMember.css';

const EditMember = () => {
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
  const { id } = useParams();

  useEffect(() => {
    const fetchMember = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5500'}/members${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const member = response.data;
      setFirstName(member.firstName);
      setLastName(member.lastName);
      setBirthday(new Date(member.birthday).toISOString().split('T')[0]);
      setStreetAddress(member.streetAddress);
      setPostalNumber(member.postalNumber);
      setCity(member.city);
      setPhoneNumber(member.phoneNumber);
      setGroup(member.group);
      setFeePaid(member.feePaid);
    };

    fetchMember();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5500/members/${id}`, {
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
      alert('Error updating member');
    }
  };

  return (
    <div className="edit-member-page">
      <Header /> {/* Include the Header component */}
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
          <button type="submit">Update Member</button>
          <button type="button" onClick={() => navigate('/members')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
