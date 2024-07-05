import bicepcurlsImage from '../../../assets/bicepcurls.jpg'
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Benchpress = () => {
  const exerciseName = 'Benchpress';
  const additionalText = 'Perform 3 sets of 10 repetitions';


  
//from hwre updation happened
  const [imageData, setImageData] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [cameraActive, setCameraActive] = useState(false); // Track camera state

  const handleKeyPress = (event) => {
    if (event.key === 'q') {
      closeCamera();
    }
  };

  const startCamera = () => {
    setCameraActive(true);
    axios.get('http://localhost:8081/Benchpress')
      .then(response => {
        console.log(response.data.message);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      })
      .catch(error => {
        console.error('Error starting camera:', error);
      });
  };

  const closeCamera = () => {
    clearInterval(intervalId); // Clear the interval
    setImageData(null); // Clear the image data
    setCameraActive(false); // Set camera state to closed
    axios.get('http://localhost:8081/stop_Benchpress')
      .then(response => {
        console.log(response.data.message);
        document.body.style.overflow = 'auto'; // Enable scrolling
      })
      .catch(error => {
        console.error('Error closing camera:', error);
      });
  };

  useEffect(() => {
    // Add event listener to handle 'q' key press
    window.addEventListener('keypress', handleKeyPress);

    // Cleanup function to remove event listener and clear interval on unmount
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures useEffect only runs once


//till here......

//css is also updated ....
  const containerStyle = {
    width: '1300px',    // Fixed width
    height: '700px',   // Fixed height
    position: 'relative',
    backgroundColor: '#162887',
    margin: '0 auto',
    overflow: 'hidden',  // Hide overflow
  };

  const imageStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  };

  const textContainerStyle = {
    position: 'absolute',
    bottom: '70px', // Adjusted to be 50px from the bottom
    left: '0',
    width: '100%',
    textAlign: 'center',
    zIndex: '10', // Ensure text appears above the image
  };

  const maintextStyle = {
    color: 'white', // Text color
    padding: '6px',
    fontSize: '60px',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman, serif ',
    borderRadius: '10px',
    backgroundColor:'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    textDecoration: 'none', 
    marginBottom: '20px', // Added margin bottom
  };

  const additionalTextStyle = {
    color: 'white',      // Text color
    padding: '3px',
    borderRadius: '3px',
    fontSize: '18px',   // Smaller font size
    fontFamily: 'Times New Roman, serif',  
    backgroundColor:'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    textDecoration: 'none', // Different font family
  };

  const buttonContainerStyle = {
    position: 'absolute',
    bottom: '25px',     // Adjusted to be 0 from the bottom
    right: '25px', // Adjust as needed
    zIndex: '20', // Ensure buttons appear above the image
  };

  const buttonStyle = {
    padding: '10px 15px',
    borderRadius: '7px',
    fontSize: '16px',
    textDecoration: 'none',  // Remove underline
    backgroundColor: '#0D2F4F',
    color: '#FFFFFF',
    marginLeft: '25px',
  };

  const watchVideoStyle = {
    padding: '10px 14px',
    
    borderRadius: '5px',
    fontSize: '16px',
    textDecoration: 'none',  // Remove underline
    backgroundColor: '#0D2F4F',
    color: '#FFFFFF',
    
    position: 'absolute',
    
    marginLeft: '-50px', // Remove left margin
    marginTop: '20px', // Add top margin
  };

  return (

    //this part also from here ....
    <div style={containerStyle}>
      {!cameraActive ? (
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={startCamera}>Start</button>
        </div>
      ) : (
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={closeCamera}>Stop</button>
        </div>
      )}

      {/* till here ..... */}

      <img 
        style={imageStyle}
        src={bicepcurlsImage}
        alt={exerciseName} 
      />
      
      <div style={textContainerStyle}>
        <div style={maintextStyle}>
          {exerciseName}
        </div>
        <div style={additionalTextStyle}>
          {additionalText}
        </div>
        <a 
          href="https://youtu.be/IODxDxX7oi4?si=fhqQMF1JO8QxWOZ4"
          target="_blank"  // Open link in a new tab
          style={watchVideoStyle}
        >
          Watch Video
        </a>
      </div>
    </div>
  );
};

export default Benchpress;
