import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const InstitutionsList = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        setLoading(true);
        const response = await api.get('/institutions/');
        setInstitutions(response.data);
      } catch (error) {
        console.error("Muassasalarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Muassasalar</h1>
        <button className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          + Yangi qo'shish
        </button>
      </div>
      
      <div className="mt-8 overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shartnoma muddati</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {institutions.map((inst) => (
              <tr key={inst.id}>
                <td className="px-6 py-4 whitespace-nowrap">{inst.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inst.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inst.contract_end_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900">Tahrirlash</button>
                  <button className="ml-4 text-red-600 hover:text-red-900">O'chirish</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstitutionsList;