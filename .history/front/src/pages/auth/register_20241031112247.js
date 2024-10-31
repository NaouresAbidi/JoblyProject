import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import './auth.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

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
    

            if (!response.ok) {

                const errorData = await response.json();
                console.error('Registration failed:', errorData.message || 'Unknown error');
                alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
                return;
            }
    

            const result = await response.json();
            console.log('Registration successful:', result.message);
    

            navigate('/authlogin');
    
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
