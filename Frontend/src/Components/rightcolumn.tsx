import React from 'react';

const Rightcolumn = ({ label, name, position }) => {
  return (
    <div className="w-1/2 flex items-center justify-center min-h-screen bg-gray-300">
      <div className="px-8 max-w-md text-center">
        <p className="text-lg font-semibold text-gray-900">
          {label}
        </p>
        <p className="mt-4 text-gray-500">{name}</p>
        <p className="text-gray-400">{position}</p>
      </div>
    </div>
  );
};

export default Rightcolumn;
