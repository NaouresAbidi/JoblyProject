import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log('Logging in with:', { email, password });

        try {
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login failed:', errorData.message || 'Unknown error');
                alert(`Login failed: ${errorData.message || 'Unknown error'}`);
                return;
            }

            const result = await response.json();
            console.log('Login successful:', result);

            // Store the userId in localStorage or state for later use
            localStorage.setItem('userId', result.userId);

            // Navigate to the user home page
            navigate('/userhome');
        } catch (error) {
            console.error('Error logging in:', error.message || 'Network error');
            alert(`Error logging in: ${error.message || 'Network error'}`);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input 
                value={email} 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                value={password}
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            <NavLink to="/register" className="register-link">Register</NavLink>
        </div>
    );
}

export default Login;
