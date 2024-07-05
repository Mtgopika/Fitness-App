import React from 'react';
import butterflyImage from '../../../assets/butterfly.jpg'

const Butterfly = () => {
  const exerciseName = 'Butterfly Stretch';
  const additionalText = 'Hold for 30 seconds';

  const containerStyle = {
    width: '1300px',    // Fixed width
    height: '900px',   // Fixed height
    position: 'relative',
    margin: '0 auto',
    overflow: 'hidden',  // Hide overflow
  };

  const imageStyle = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  };
  const maintextStyle = {
    position: 'absolute',
    bottom: '230px', // Adjust as needed
    left: '100px',   // Adjust as needed
    color: 'black', // Text color
    padding: '6px',
    fontSize: '80px',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman, serif ',
    borderRadius: '10px',
    backgroundColor:'transparent',
  };

  const additionalTextStyle = {
    position: 'absolute',
    bottom: '210px',     // Adjust as needed
    left: '110px',       // Adjust as needed
    color: 'black',      // Text color
    padding: '3px',
    borderRadius: '3px',
    fontSize: '14px',   // Smaller font size
    fontFamily: 'Times New Roman, serif',  // Different font family
    textDecoration: 'underline', 
  };
   
  
  const watchVideoButtonStyle = {
    position: 'absolute',
    bottom: '110px',     // Adjust as needed
    left: '25px',       // Adjust as needed
    padding: '10px 15px',
    backgroundColor: '#6C757D',  // Button background color
    color: '#FFFFFF',   // Button text color
    borderRadius: '5px',
    fontSize: '16px',
    textDecoration: 'underline',  // Remove underline
  };
  const letsstartButtonStyle = {
    ...watchVideoButtonStyle,  // Use the same styles as the "Watch Video" button
    bottom: '110px',      // Adjust as needed
    left: '1200px',       // Adjust as needed
    backgroundColor: '#28A745',  // Different button background color


};



  return (
    <div style={containerStyle}>
      <img 
        src={butterflyImage} 
        alt={exerciseName}
        style={imageStyle}
      />
      <div style={maintextStyle}>
        {exerciseName}
      </div>
      <div style={additionalTextStyle}>
        {additionalText}
      </div>
      <a 
        href="https://youtu.be/amblBIOKniA?si=iL3HpqZ2wSa0Tj2S"  // Replace with your YouTube video URL
        target="_blank"  // Open link in a new tab
        style={watchVideoButtonStyle}
      >
        Watch Video
      </a>
      <a 
        
     target="_blank"  // Open link in a new tab
        style={letsstartButtonStyle}
      >
        lets start
      </a>


    </div>
  );
};

export default Butterfly;