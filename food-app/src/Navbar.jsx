import React from 'react';
import supabase from './supabaseClient';

const Navbar = ({ setAuthenticated }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Log the user out
    setAuthenticated(false); // Update authentication state
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl">My App</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
