import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './auth.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        
        console.log('Logging in with:', { username, password });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input 
                value={username} 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
            />
             <input 
                value={em} 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                value={password}
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            <NavLink to="/login" className="register-link">Login</NavLink>
        </div>
    );
}

export default Register;
