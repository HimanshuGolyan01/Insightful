import React from 'react';
import { Avatar } from './Blogcard';

const Appbar = () => {
  return (
    <div className="fixed top-0 w-full bg-white flex items-center justify-between px-6 py-3 shadow-sm z-10 ">
      <div className="text-xl font-bold text-gray-800 font-rubik tracking-wide">
        Insightful
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Welcome</span>
        <Avatar name="Himanshu" />
      </div>
    </div>
  );
};

export default Appbar;
