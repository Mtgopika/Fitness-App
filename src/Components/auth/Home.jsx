// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to FitFusion!</h1>
      <p>Transform your fitness journey with FitFusion: Where strength meets flexibility, and determination fuels progress.</p>
      <Link to="/signin" className="get-started-link">Get Started</Link>
    </div>
  );
};

export default Home;
