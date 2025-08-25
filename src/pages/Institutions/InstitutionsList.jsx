import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader';
import InstitutionFormModal from './InstitutionFormModal';
import Pagination from '../../components/common/Pagination'; // Pagination komponentini import qilamiz
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Backend'dagi PAGE_SIZE bilan bir xil bo'lishi kerak
const PAGE_SIZE = 10;

const InstitutionsList = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  // Pagination uchun yangi state'lar
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchInstitutions = useCallback(async (page) => {
    try {
      setLoading(true);
      // API so'roviga 'page' parametrini qo'shamiz
      const response = await api.get(`/institutions/?page=${page}`);
      
      // Backend'dan kelgan ma'lumotlarni state'larga joylaymiz
      setInstitutions(response.data.results);
      setTotalCount(response.data.count);

    } catch (error) {
      console.error("Muassasalarni yuklashda xatolik:", error);
      toast.error("Muassasalarni yuklashda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Joriy sahifa o'zgarganda ma'lumotlarni qayta yuklaymiz
    fetchInstitutions(currentPage);
  }, [fetchInstitutions, currentPage]);

  const handleOpenModal = (institution = null) => {
    setSelectedInstitution(institution);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInstitution(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatan ham bu muassasani o'chirmoqchimisiz?")) {
      try {
        await api.delete(`/institutions/${id}/`);
        toast.success("Muassasa muvaffaqiyatli o'chirildi!");
        // O'chirishdan keyin joriy sahifani qayta yuklash
        fetchInstitutions(currentPage);
      } catch (error) {
        console.error("O'chirishda xatolik:", error);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Muassasalar</h1>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          + Yangi qo'shish
        </button>
      </div>
      
      <div className="mt-8 overflow-hidden bg-white rounded-t-lg shadow">
        <div className="overflow-x-auto">
            <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
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
                  <td className="flex items-center px-6 py-4 space-x-4 whitespace-nowrap">
                    <button onClick={() => handleOpenModal(inst)} className="text-gray-500 hover:text-indigo-600">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(inst.id)} className="text-gray-500 hover:text-red-600">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
        </div>
      </div>

      {/* Pagination komponentini shu yerga qo'shamiz */}
      <Pagination 
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        onPageChange={page => setCurrentPage(page)}
      />

      <InstitutionFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={() => {
          fetchInstitutions(currentPage); // Muvaffaqiyatli amaldan keyin ro'yxatni yangilash
        }}
        initialData={selectedInstitution}
      />
    </div>
  );
};

export default InstitutionsList;