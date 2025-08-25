import React from 'react';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
      <div className="p-3 mr-4 text-indigo-500 bg-indigo-100 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-500">{title}</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;