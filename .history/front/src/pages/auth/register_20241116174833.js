import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './auth.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [birthday, setBirthday] = useState('');
    const [userType, setUserType] = useState('jobSeeker'); // Default to job seeker
    const navigate = useNavigate();

    const handleRegister = async () => {
        console.log('Registering with:', { username, password, email, country, city, zipCode, birthday, userType });
    
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email, country, city, zipCode, birthday, userType }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message || 'Unknown error');
                alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
                return;
            }

            const result = await response.json();
            console.log('Registration successful:', result.message);
            navigate('/login');
    
        } catch (error) {
            console.error('Error registering:', error.message || 'Network error');
            alert(`Error registering: ${error.message || 'Network error'}`);
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
                placeholder="Email"  
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                value={password}
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
                value={confirmPassword}
                type="password" 
                placeholder="Confirm Password" 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <input 
                value={country}
                type="text" 
                placeholder="Country" 
                onChange={(e) => setCountry(e.target.value)} 
            />
            <input 
                value={city}
                type="text" 
                placeholder="City" 
                onChange={(e) => setCity(e.target.value)} 
            />
            <input 
                value={zipCode}
                type="text" 
                placeholder="Zip Code" 
                onChange={(e) => setZipCode(e.target.value)} 
            />
            <input 
                value={birthday}
                type="date" 
                onChange={(e) => setBirthday(e.target.value)} 
            />
            <select 
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
            >
                <option value="jobSeeker">Job Seeker</option>
                <option value="organization">Organization</option>
            </select>
            <button onClick={handleRegister}>Register</button>
            <NavLink to="/login" className="register-link">Login</NavLink>
        </div>
    );
}

export default Register;
