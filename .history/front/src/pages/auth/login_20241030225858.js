import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

            // Check if the login request was successful
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login failed:', errorData.message || 'Unknown error');
                alert(`Login failed: ${errorData.message || 'Unknown error'}`);
                return;
            }

            // Parse the JSON response if login was successful
            const result = await response.json();
            console.log('Login successful:', result);

            // Display a success alert and the user ID from the response
            alert(`Login successful! User ID: ${result.userId}`);
            // Optionally, redirect the user after successful login
            // window.location.href = '/home';  // Uncomment if you have a home route

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
