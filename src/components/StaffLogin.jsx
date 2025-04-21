// src/components/StaffLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "/firebase";

const StaffLogin = ({ setIsAdmin }) => {

  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const signInWithEmail = async (e) => {
    e.preventDefault();
    setAuthing(true);
    setError('');
  
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate('/');
        setIsAdmin(true);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-customBlue text-white">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Staff Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={signInWithEmail} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded hover:bg-purple-500 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;
