import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-indigo-600"></div>
    </div>
  );
};

export default Loader;