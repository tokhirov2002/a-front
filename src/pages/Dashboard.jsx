import React from 'react';

const Dashboard = () => {
  // Bu yerga API'dan umumiy statistika (kartalar uchun) va so'nggi videolar ro'yxatini
  // olish logikasi qo'shiladi (useState va useEffect yordamida).

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Bosh Sahifa</h1>
      
      {/* Kartalar (Umumiy statistika) */}
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-500">Jami Videolar</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">1,234</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-500">Umumiy Like'lar</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">56,789</p>
        </div>
        {/* Boshqa kartalar */}
      </div>

      {/* So'nggi videolar ro'yxati */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">So'nggi Videolar</h2>
        <div className="mt-4 bg-white rounded-lg shadow-md">
          {/* Jadval yoki ro'yxat shu yerda bo'ladi */}
          <p className="p-4">Bu yerda videolar ro'yxati chiqadi...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;