import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import api from '../../services/api';
import { toast } from 'react-toastify';

const InstitutionFormModal = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'SHOP',
    contact_info: '',
    contract_start_date: '',
    contract_end_date: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Yangi qo'shish uchun formani tozalash
      setFormData({
        name: '', type: 'SHOP', contact_info: '',
        contract_start_date: '', contract_end_date: '',
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        // Tahrirlash
        await api.put(`/institutions/${initialData.id}/`, formData);
        toast.success("Muassasa muvaffaqiyatli yangilandi!");
      } else {
        // Yaratish
        await api.post('/institutions/', formData);
        toast.success("Yangi muassasa muvaffaqiyatli qo'shildi!");
      }
      onSuccess(); // Ro'yxatni yangilash uchun
      onClose(); // Modalni yopish
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Muassasani Tahrirlash" : "Yangi Muassasa Qo'shish"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nomi</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 input-style" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Turi</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full mt-1 input-style">
            <option value="SHOP">Do'kon</option>
            <option value="EDU_CENTER">O'quv Markazi</option>
            <option value="COLLEGE">Kollej</option>
            <option value="OTHER">Boshqa</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Shartnoma boshlanishi</label>
          <input type="date" name="contract_start_date" value={formData.contract_start_date} onChange={handleChange} required className="w-full mt-1 input-style" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Shartnoma tugashi</label>
          <input type="date" name="contract_end_date" value={formData.contract_end_date} onChange={handleChange} required className="w-full mt-1 input-style" />
        </div>
        <div className="pt-2 text-right">
          <button type="button" onClick={onClose} className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Bekor qilish
          </button>
          <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
            {loading ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InstitutionFormModal;