import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  // State to track the input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State to handle the redirection to home page
  const [redirectToHome, setRedirectToHome] = useState(false);

  // Function to handle form submission
  const handleLogin = (event) => {
    event.preventDefault();
    //THIS IS STATIC VALUE OF USERNAME & PASSWORD
    //**LoginPage: ADD forget pass & GG login
    //**RegisPage: Name, Surname ,Birthday, email, pass, comfirm pass  
    const staticUsername = 'demo_user';
    const staticPassword = 'password';
    if (username === staticUsername && password === staticPassword) {
      setRedirectToHome(true);
    } else {
      alert('Invalid username or password');
    }
  };

  // Redirect to home page if authenticated
  if (redirectToHome) {
    return <Navigate to="/tableAndForm" />;
  }

  return (
    <div className="login-bg-class bg-cover h-screen flex items-center justify-center">
      <form className="bg-white bg-opaity-75 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
