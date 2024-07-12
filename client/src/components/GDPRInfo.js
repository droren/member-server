import React from 'react';
import './GDPRInfo.css';

const GDPRInfo = () => {
  return (
    <div className="gdpr-info-page">
      <h1>GDPR Information</h1>
      <p>
        In accordance with the General Data Protection Regulation (GDPR), we are committed to protecting and respecting your privacy. This policy outlines how we collect, use, and protect your personal data.
      </p>
      <h2>What data do we collect?</h2>
      <p>
        We collect personal data that you provide to us directly, including your name, birthday, address, phone number, and membership details.
      </p>
      <h2>How do we use your data?</h2>
      <p>
        Your personal data is used to manage your membership, communicate with you, and ensure compliance with our membership policies.
      </p>
      <h2>How do we protect your data?</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, use, or disclosure.
      </p>
      <h2>Your rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data. You can also object to the processing of your data or request data portability.
      </p>
      <button onClick={() => window.print()}>Print GDPR Information</button>
    </div>
  );
};

export default GDPRInfo;
