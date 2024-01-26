import React from 'react';
import './Home.css'; 
import Navbar from '../../component/NavBar';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />    
      <div className="home-bg-class bg-cover flex-1 flex items-center justify-start p-8">
        <div >
          <h1 className="text-3xl text-gray-900 font-bold mb-4">Welcome to Wealth Track !</h1>
          <p>Development of web applications  for analyzing personal assets and investments.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
