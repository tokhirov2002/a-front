import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import api from '../../services/api';
import { toast } from 'react-toastify';

const VideoUploadModal = ({ isOpen, onClose, onSuccess }) => {
  const [caption, setCaption] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [institutionId, setInstitutionId] = useState('');
  const [platform, setPlatform] = useState('INSTAGRAM');
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Modal ochilganda muassasalar ro'yxatini yuklash
      const fetchInstitutions = async () => {
        const response = await api.get('/institutions/');
        setInstitutions(response.data);
        if (response.data.length > 0) {
          setInstitutionId(response.data[0].id);
        }
      };
      fetchInstitutions();
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !institutionId) {
      toast.warn("Iltimos, video faylni va muassasani tanlang.");
      return;
    }

    const formData = new FormData();
    formData.append('video_file', videoFile);
    formData.append('caption', caption);
    formData.append('institution', institutionId);
    formData.append('platform', platform);
    formData.append('post_type', 'REELS'); // Misol uchun

    setLoading(true);
    try {
      await api.post('/videos/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success("Video muvaffaqiyatli yuklandi!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Video yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yangi Video Joylash">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Muassasa</label>
          <select value={institutionId} onChange={(e) => setInstitutionId(e.target.value)} className="w-full mt-1 input-style">
            {institutions.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Platforma</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full mt-1 input-style">
            <option value="INSTAGRAM">Instagram</option>
            <option value="TIKTOK">TikTok</option>
            <option value="FACEBOOK">Facebook</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Izoh (Caption)</label>
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows="3" className="w-full mt-1 input-style"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Video Fayl</label>
          <input type="file" accept="video/*" onChange={handleFileChange} required className="w-full mt-1" />
        </div>
        <div className="pt-2 text-right">
          <button type="button" onClick={onClose} className="px-4 py-2 mr-2 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200">
            Bekor qilish
          </button>
          <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
            {loading ? 'Yuklanmoqda...' : 'Yuklash'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default VideoUploadModal;