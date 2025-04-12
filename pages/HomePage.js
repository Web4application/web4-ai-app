import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Web4 AI App</h1>
      <Link to="/chat">Go to Chat</Link>
      <Link to="/profile">Go to Profile</Link>
    </div>
  );
};

export default HomePage;
