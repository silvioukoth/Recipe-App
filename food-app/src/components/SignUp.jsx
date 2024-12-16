import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (email && password) {
      // Simulate sign up process (replace with actual API call)
      setAuthenticated(true);
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="signup-form bg-white p-8 rounded-md shadow-lg w-80">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSignUp}>
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#40b48e] text-white rounded-md"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-[#40b48e]">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
