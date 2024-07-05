// Start.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Start.css';

const Start = ({ signOut }) => {
  return (
    <div className="start-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>FitFusion</h1>
      </div>
      <button className="signout-btn" onClick={signOut}>Sign Out</button>
      <h2>Get Fit Your Way</h2>
      <h3>Transform your fitness journey with FitFusion: Where strength meets</h3>
         <h4>flexibility, and determination fuels progress</h4>
      <Link className="get-started-link" to='/Input'>Let's Get Started</Link>
    </div>
  );
};

export default Start;
