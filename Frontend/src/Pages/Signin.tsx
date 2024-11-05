import React from 'react';
import { useState } from 'react';
import Rightcolumn from '../Components/rightcolumn';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
const Signin = () => {

  const [email , setEmail] = useState(" ")
  const [name , setName] = useState(" ")
  const [password , setPassword] = useState(" ")
  const navigate = useNavigate();

  async function signinHandler() {
    try {
      const response = await axios.post("https://backend.golyanhimanshu.workers.dev/api/v1/user/signin", {
        name : name,
        email : email,
        password : password
      });
      const token = response.data.jwt
      localStorage.setItem("token" , token)
      // console.log(response.data)
      navigate("/Blogs")
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }
  return (
    <div className="flex min-h-screen bg-gray-300">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 py-10">
          <h2 className="text-5xl mb-2 font-rubik font-bold">Login to your account</h2>
          <p className="text-gray-500 mb-6">
            Already have an account? <a href="/Signup" className="text-blue-600 hover:underline">Signup</a>
          </p>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
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
            onClick={signinHandler}
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 mt-8"
          >
            Sign In
          </button>
        </div>
      </div>
      <Rightcolumn 
        label="“The customer service I received was exceptional. The support team went above and beyond to address my concerns.”"
        name="Jules Winnfield"
        position="CEO, Acme Inc"
      />
    </div>
  );
};

export default Signin;
