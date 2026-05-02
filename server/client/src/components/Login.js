import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('https://project-production-126f.up.railway.app/api/auth/login', { email, password });
      
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert("Login Successful!");
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <form onSubmit={handleLogin} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Login</h2>
        <input 
          type="email" placeholder="Email" required 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
        />
        <input 
          type="password" placeholder="Password" required 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
