import React from 'react';
import supabase from './supabaseClient';
import logo from './assets/bankfood.jpeg';

const Navbar = ({ setAuthenticated }) => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setAuthenticated(false); 
      console.log("Logged out successfully!"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-md flex justify-between items-center p-4"> 
      <img src={logo} alt="App Logo" className="h-8 w-8" />
      <h1 className="text-2xl">Food-Bank</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" 
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;