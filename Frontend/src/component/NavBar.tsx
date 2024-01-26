// Navbar.js
import React from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };
  return (
    <div className="sticky top-0 z-10 bg-white bg-opacity-75 border-b border-gray-300 p-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
          >
            Wealth Track
          </a>
            <div className="flex items-center gap-x-1">
              <button
                className="hidden px-4 py-2 font-bold text-gray-900 uppercase transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
                onClick={navigateToLogin}
              >
                Log In
              </button>
              <button
                className="hidden bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-white font-bold uppercase shadow-md transition-all hover:shadow-lg hover:from-gray-800 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
