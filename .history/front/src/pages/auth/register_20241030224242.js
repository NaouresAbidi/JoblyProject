import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './auth.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = () => {
        
        console.log('Registering with:', { username, password, email });
        try { fetch('127.0.0.1:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        })
    }} catch (error) {

    return (
        <div className="login-container">
            <h1>Register</h1>
            <input 
                value={username} 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
            />
             <input 
                value={email}  
                type="email" 
                placeholder="email"  
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                value={password}
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleRegister}>Register</button>
            <NavLink to="/login" className="register-link">Login</NavLink>
        </div>
    );
}

export default Register;
