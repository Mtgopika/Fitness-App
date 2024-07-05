import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/SignUp';
import Start from './Components/auth/Start';
import Input from './Components/auth/Input'; 
import { auth } from './FirebaseConfig';

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState('signin');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log('Current URL:', location.pathname);
  }, [location]);

  const switchForm = (formName) => {
    setForm(formName);
  };

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.log(error);
    });
  };

  
  return (
    <div className="App">
   
      {signupSuccess && <p>Signup successful!</p>}
      
      {user ? (
        <Start user={user} signOut={signOut} />
      ) : (
        form === 'signin' ? (
          <SignIn switchForm={switchForm} />
        ) : (
          <SignUp 
            switchForm={switchForm} 
            setSignupSuccess={setSignupSuccess} 
            setErrorMessage={setErrorMessage} 
          />
        )
      )}

      <Routes>
        <Route path="/Input" element={<Input />} />
      </Routes>
    </div>
  );
}
  
export default App;