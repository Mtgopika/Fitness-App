
import React, { useState } from 'react';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import video from '../../assets/video.mp4'; 
import './Style.css'

const SignUp = ({ switchForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSignupSuccess(true);
        setErrorMessage("");
      }).catch((error) => {
        console.log(error);
        setSignupSuccess(false);
        setErrorMessage(error.message);
      });
  };


  return (
    <div className='sign-up-container'>
       <div className='video-container' >
        <video src={video} autoPlay muted loop ></video>
        </div>
        <div className='login-form' >
        <div className='content'>
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
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
        <button type='submit'>Sign Up</button>
        {signupSuccess && <p>Signup successful!</p>}
        {errorMessage && <p>Error: {errorMessage}</p>}
        <p>Already have an account? <button onClick={() => switchForm('signin')}>Sign In</button></p>
      </form>
    </div>
    </div>
    </div>
  );
};

export default SignUp;