import React, { useState } from 'react';
import { auth } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import video from '../../assets/video.mp4'; 
import './Style.css'

const SignIn = ({ switchForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='sign-in-container' >
      <div className='video-container' >
        <video src={video} autoPlay muted loop ></video>
        
        </div>
    
      <div className='login-form' >
        <div className='content'>
        <form onSubmit={signIn} >
          <h1>Welcome!</h1>
          <input
            type='email'
            placeholder='Enter your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <button type='submit'>Log In</button>
          <p >Don't have an account? <button onClick={() => switchForm('signup')} >Sign Up</button></p>
        </form>
        </div>
          </div>
             </div>
    
  );
};

export default SignIn;