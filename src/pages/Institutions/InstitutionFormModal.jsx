import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import api from '../../services/api';
import { toast } from 'react-toastify';

const InstitutionFormModal = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'SHOP',
    contact_info: '', // Bu maydon endi formaga qo'shiladi
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
        name: '', 
        type: 'SHOP', 
        contact_info: '',
        contract_start_date: '', 
        contract_end_date: '',
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
        await api.put(`/institutions/${initialData.id}/`, formData);
        toast.success("Muassasa muvaffaqiyatli yangilandi!");
      } else {
        await api.post('/institutions/', formData);
        toast.success("Yangi muassasa muvaffaqiyatli qo'shildi!");
      }
      onSuccess();
      onClose();
    } catch (error) {
      // Xatolikni aniqroq ko'rsatish
      if (error.response && error.response.data) {
        // DRF qaytargan xatoliklarni ajratib olish
        const errorMessages = Object.entries(error.response.data)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
        toast.error(`Xatolik yuz berdi:\n${errorMessages}`);
      } else {
        toast.error("Serverga ulanishda xatolik yuz berdi.");
      }
      console.error("Xatolik:", error); // Konsolga to'liq xatoni chiqarish
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
        
        {/* QO'SHILGAN QISM: Kontakt ma'lumotlari uchun maydon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Kontakt ma'lumotlari</label>
          <textarea 
            name="contact_info" 
            value={formData.contact_info} 
            onChange={handleChange} 
            required 
            rows="3"
            className="w-full mt-1 input-style"
            placeholder="Telefon raqam, manzil va h.k."
          />
        </div>
        {/* QO'SHILGAN QISM TUGADI */}

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