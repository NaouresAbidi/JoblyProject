import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Register =() =>{
    return(
        <div>
            <h1>Register</h1>
            <p><NavLink to="/login">login</NavLink></p>
        </div>
    )
}
export default Register;