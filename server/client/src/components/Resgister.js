import React, { useState } from 'react';
import { register } from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Member' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("User Registered Successfully! You can now login.");
        } catch (err) {
            alert("Registration Failed");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <h2>Register Team Member</h2>
                <input type="text" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required /><br/><br/>
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required /><br/><br/>
                <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required /><br/><br/>
                <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                </select><br/><br/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;