import pushupImage from '../../../assets/pushup.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pushup = () => {
  const exerciseName = 'Push-up';
  const additionalText = 'Perform 3 sets of 10 repetitions';

  const [imageData, setImageData] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'q') {
      closeCamera();
    }
  };

  const startCamera = () => {
    const userConfirmed = window.confirm('Press q to stop PoseEstimation. Have a great day!!!');
    if (userConfirmed) {
    setCameraActive(true);
    axios.get('http://localhost:8081/pushup')
      .then(response => {
        console.log(response.data.message);
        document.body.style.overflow = 'hidden';

        const id = setInterval(() => {
          // Fetch new images from the server if needed
        }, 1000);
        setIntervalId(id);
      })
      .catch(error => {
        console.error('Error starting camera:', error);
      });
    }
  };

  const closeCamera = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setImageData(null);
    setCameraActive(false);
    axios.get('http://localhost:8081/stop_pushup')
      .then(response => {
        console.log(response.data.message);
        document.body.style.overflow = 'auto';
      })
      .catch(error => {
        console.error('Error closing camera:', error);
      });
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const containerStyle = {
    width: '1300px',
    height: '700px',
    position: 'relative',
    backgroundColor: '#162887',
    margin: '0 auto',
    overflow: 'hidden',
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
    bottom: '70px',
    left: '0',
    width: '100%',
    textAlign: 'center',
    zIndex: '10',
  };

  const mainTextStyle = {
    color: 'white',
    padding: '6px',
    fontSize: '60px',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman, serif',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textDecoration: 'none',
    marginBottom: '20px',
  };

  const additionalTextStyle = {
    color: 'white',
    padding: '3px',
    borderRadius: '3px',
    fontSize: '18px',
    fontFamily: 'Times New Roman, serif',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textDecoration: 'none',
  };

  const buttonContainerStyle = {
    position: 'absolute',
    bottom: '25px',
    right: '25px',
    zIndex: '20',
  };

  const buttonStyle = {
    padding: '10px 15px',
    borderRadius: '7px',
    fontSize: '16px',
    textDecoration: 'none',
    backgroundColor: '#0D2F4F',
    color: '#FFFFFF',
    marginLeft: '25px',
  };

  const watchVideoStyle = {
    padding: '10px 14px',
    borderRadius: '5px',
    fontSize: '16px',
    textDecoration: 'none',
    backgroundColor: '#0D2F4F',
    color: '#FFFFFF',
    position: 'absolute',
    marginLeft: '-50px',
    marginTop: '20px',
  };

  return (
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

      <img
        style={imageStyle}
        src={pushupImage}
        alt={exerciseName}
      />

      <div style={textContainerStyle}>
        <div style={mainTextStyle}>
          {exerciseName}
        </div>
        <div style={additionalTextStyle}>
          {additionalText}
        </div>
        <a
          href="https://youtu.be/IODxDxX7oi4?si=fhqQMF1JO8QxWOZ4"
          target="_blank"
          style={watchVideoStyle}
        >
          Watch Video
        </a>
      </div>
    </div>
  );
};

export default Pushup;
