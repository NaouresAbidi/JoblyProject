import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './auth.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        console.log('Registering with:', { username, password, email });
    
        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });
    
            // Check if the request was successful
            if (!response.ok) {
                // Handle 4xx or 5xx status codes
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message || 'Unknown error');
                return;
            }
    
            // Parse the JSON response if registration was successful
            const result = await response.json();
            console.log('Registration successful:', result.message);
            // You can add any further actions here, like redirecting the user or showing a success message
    
        } catch (error) {
            console.error('Error registering:', error.message || 'Network error');
        }
    };
    

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
