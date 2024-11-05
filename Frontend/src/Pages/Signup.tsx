import React, { useState } from 'react';
import axios from "axios";
import Rightcolumn from '../Components/rightcolumn';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function signupHandler() {
    try {
      const response = await axios.post("https://backend.golyanhimanshu.workers.dev/api/v1/user/signup", {
        email,
        name,
        password,
      });
      
      const token = response.data.jwt; // Access token from response.data
      if (token) {
        localStorage.setItem("token", token);      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  // Redirect to dashboard after signup if successful
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 py-10">
          <h2 className="text-5xl mb-2 font-rubik font-bold">Create an account</h2>
          <p className="text-gray-500 mb-6">
            Already have an account? <a href="/Signin" className="text-blue-600 hover:underline">Sign in</a>
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="abc@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={signupHandler}
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 mt-8"
          >
            Sign Up
          </button>
        </div>
      </div>
      <Rightcolumn 
        label="“The level of dedication and professionalism from the support team was outstanding.”"
        name="Vincent Vega"
        position="COO, Globex Corp"
      />
    </div>
  );
};

export default Signup;
