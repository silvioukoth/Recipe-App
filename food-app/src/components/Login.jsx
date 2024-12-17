import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Simulate a login check (replace with actual API call)
      if (email === "user@example.com" && password === "password") {
        setAuthenticated(true);
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="login-form bg-white p-8 rounded-md shadow-lg w-80">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#315e4f] text-white rounded-md"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#397561]">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
