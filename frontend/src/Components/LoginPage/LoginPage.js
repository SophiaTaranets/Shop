import React, { useState } from 'react';
import './LoginPage.css';
import {ARI_URL} from '../../constants'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        
        e.preventDefault();
        // Add your login logic here, e.g., make an API request
        axios.post(`${ARI_URL}/login/`, {
        username: username,
        password: password,
        })
        .then(function (response) {
            localStorage.setItem('Token', response.data.token)
            navigate("/")
        })
        .catch(function (error) {
            console.log(error);
        });
        // Reset input values after form submission
        setUsername('');
        setPassword('');
    };

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
