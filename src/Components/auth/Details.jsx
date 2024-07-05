import React from 'react';
import { useLocation } from 'react-router-dom';

function DisplayDetails() {
  const location = useLocation();
  const { gender, bodyPart, bmiIndex } = location.state ; // Check if location.state exists

  return (
    <div>
      <h1>Selected Details</h1>
      {gender && (
        <p>Gender: {gender}</p>
      )}
      {bodyPart && (
        <p>Body Part: {bodyPart}</p>
      )}
      {bmiIndex && (
        <p>BMI Index: {bmiIndex}</p>
      )}
    </div>
  );
}

export default DisplayDetails;
