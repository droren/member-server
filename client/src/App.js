import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import MemberList from './components/MemberList';
import AddMember from './components/AddMember';
import RemoveMember from './components/RemoveMember';
import PrintMembers from './components/PrintMembers';
import EditMember from './components/EditMember';
import GDPRInfo from './components/GDPRInfo'; // Import GDPRInfo component
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/remove-member" element={<RemoveMember />} />
          <Route path="/print-members" element={<PrintMembers />} />
          <Route path="/edit-member/:id" element={<EditMember />} />
          <Route path="/gdpr" element={<GDPRInfo />} /> {/* Add route for GDPRInfo */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
