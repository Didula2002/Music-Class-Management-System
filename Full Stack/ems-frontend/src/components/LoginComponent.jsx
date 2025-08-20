import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigator = useNavigate();

    useEffect(() => {
        const inputs = document.querySelectorAll(".input");

        const addcl = function() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        const remcl = function() {
            let parent = this.parentNode.parentNode;
            if (this.value === "") {
                parent.classList.remove("focus");
            }
        }

        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });

        // Cleanup function to remove event listeners
        return () => {
            inputs.forEach(input => {
                // Check if the input and its parent nodes exist before removing event listeners
                if (input && input.parentNode && input.parentNode.parentNode) {
                    input.removeEventListener("focus", addcl);
                    input.removeEventListener("blur", remcl);
                }
            });
        };
    }, []); // Empty dependency array to ensure this effect runs only once

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            // Successful login
            console.log('Login successful');
            navigator('/dashboard'); // Navigate to the dashboard
            // Redirect or set authentication state
        } else {
            // Failed login
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap" rel="stylesheet"></link>
	<script src="https://kit.fontawesome.com/a81368914c.js"></script>
            <link rel="stylesheet" href="../src/login.css"></link>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <div className="login-content">
            <img className="wave" src="../src/img/wave.png"></img>
	<div className="container">
		<div className="img">
			<img src="../src/img/bg.svg"></img>
		</div>
		<div className="login-content">
                <form>
                    <img src="../src/img/avatar.svg"></img>
                    <h2 className="title">Welcome</h2>
                    <div className="input-div one">
                        <div className="i">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="div">
                            <h5>Username</h5>
                            <input type="text"  className="input" value={username} onChange={e => setUsername(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="input-div pass">
                        <div className="i">
                            <i className="fas fa-lock"></i>
                        </div>
                        <div className="div">
                            <h5>Password</h5>
                            <input type="password"  className="input" value={password} onChange={e => setPassword(e.target.value)}></input>
                        </div>
                    </div>

                    <button type="button" className="btn" onClick={handleLogin}>Login</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
            <script type="text/javascript" src="../src/script.js"></script>
        </div></div></div>
    );
};

export default LoginComponent;
