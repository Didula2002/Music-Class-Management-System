
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError('Email and password are required.');
        return;
      }
  
      const response = await axios.get(`http://localhost:8080/api/users/get`, {
        params: {
          email: email,
          password: password
        }
      });
  
      if (response.status === 200 && response.data) {
        setUser(response.data);
        // Redirect to /view-clients
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('An error occurred during login.');
        console.error('Error in handleLogin:', err);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/add', { firstname, lastname, email, dob, password });
      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
      setDob('');
      setIsLoginOpen(true);
    } catch (err) {
      console.error('Error in handleRegister:', err);
      setError(err.response?.data?.message || 'An error occurred during registration.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoginOpen(true);
  };

  return (
    <div className="container mt-5">
      {user ? (
        <div className="text-center">
          <h1>Welcome, {user.firstname}!</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            {isLoginOpen ? (
              <div className="card">
                <div className="card-header">
                  <h2>Login</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </form>
                  {error && <div className="text-danger mt-3">{error}</div>}
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-link"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    Register
                  </button>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-header">
                  <h2>Register</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={handleRegister}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </form>
                  {error && <div className="text-danger mt-3">{error}</div>}
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-link"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
