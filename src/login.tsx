import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useAuth} from "./useAuth.tsx";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await auth.login(username, password);

      // Assuming your API returns a success message or a token on successful login
      if (response) {
        // Handle successful login (e.g., store token, redirect)
        console.log('Login successful:');
        navigate('/secure/protetta'); // Redirect to the protected route after successful login
      } else {
        setErrorMessage('Authentication error: Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('Authentication error: Invalid username or password');
      console.error('Login error:', error);
    }
  };

  // Get the error message from the query parameter
  const searchParams = new URLSearchParams(location.search);
  const errorParam = searchParams.get('error');
  if (errorParam) {
    setErrorMessage('Authentication error: Invalid username or password');
  }

  return (
    <div>
      <div className="container">
        <form id="login" role="form" className="form-horizontal" onSubmit={handleSubmit}>
          <h3>Login:</h3>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="form-group has-feedback has-feedback-left">
            <label className="col-sm-2 control-label" htmlFor="username">
              Username:
            </label>
            <div className="left-inner-addon col-sm-4">
              <i className="icon-user glyphicon glyphicon-user" />
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              {/* Add any necessary validation message display here */}
            </div>
          </div>

          <div className="form-group has-feedback has-feedback-left">
            <label className="col-sm-2 control-label" htmlFor="password">
              Password:
            </label>
            <div className="left-inner-addon col-sm-4">
              <i className="icon-key glyphicon glyphicon-lock" />
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              {/* Add any necessary validation message display here */}
            </div>
          </div>

          <br />

          <div className="form-group">
            <div className="col-sm-offset-2 col-xs-10">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;