import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
      navigate('/login');
    };

    // const navigateToRegister = () => {
    //     navigate('/login');
    //   };

  return (
    <div className="bg-gradient-to-r from-primaryColor from-10% secondaryColor via-40% to-accentColor to-90% flex items-center justify-center h-screen">
      <div className="backdrop-blur-xl bg-white/30 p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to Wealth Track Website</h1>
        
        <div className="mt-6 flex justify-center">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" 
            onClick={navigateToLogin}
            >
            Log In
          </button>
        
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
