import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditMember.css';

const EditMember = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [group, setGroup] = useState('');
  const [feePaid, setFeePaid] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMember = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5500/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const member = response.data;
      setName(member.name);
      setBirthday(new Date(member.birthday).toISOString().split('T')[0]);
      setContactInfo(member.contactInfo);
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
      alert('Error updating member');
    }
  };

  return (
    <div className="edit-member-page">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Birthday</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contact Information</label>
          <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />
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
