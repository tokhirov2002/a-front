import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import Loader from '../../components/common/Loader';
import VideoUploadModal from './VideoUploadModal';
import Pagination from '../../components/common/Pagination';
import { TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

const VideosList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchVideos = useCallback(async (page) => {
        try {
            setLoading(true);
            const response = await api.get(`/videos/?page=${page}`);
            
            // TO'G'IRLANGAN QISM: Ma'lumotlar endi .results ichidan olinadi
            const formattedVideos = (response.data.results || []).map(video => ({
                ...video,
                video_url: `${BACKEND_URL}${video.video_file}`
            }));
            setVideos(formattedVideos);
            setTotalPages(Math.ceil(response.data.count / 10)); // Jami sahifalar sonini hisoblash

        } catch (error) {
            console.error("Videolarni yuklashda xatolik:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVideos(currentPage);
    }, [fetchVideos, currentPage]);
    
    const handleDelete = async (id) => {
        if (window.confirm("Haqiqatan ham bu videoni o'chirmoqchimisiz?")) {
            try {
                await api.delete(`/videos/${id}/`);
                toast.success("Video muvaffaqiyatli o'chirildi!");
                // Agar o'chirilgan element sahifadagi yagona bo'lsa, avvalgi sahifaga o'tish
                if (videos.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                } else {
                    fetchVideos(currentPage);
                }
            } catch (error) {
                console.error("Videoni o'chirishda xatolik:", error);
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Videolar</h1>
                <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    + Video joylash
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map(video => (
                    <div key={video.id} className="relative overflow-hidden bg-white rounded-lg shadow-md group">
                        <video controls className="w-full h-48 object-cover">
                           <source src={video.video_url} type="video/mp4" />
                        </video>
                        <div className="p-4">
                            <p className="font-semibold text-gray-800">{video.institution?.name || 'Noma`lum'}</p>
                            <p className="mt-2 text-sm text-gray-600 truncate">{video.caption}</p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-full">{video.platform}</span>
                                <span className="text-sm text-gray-500">{new Date(video.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="absolute top-2 right-2">
                            <button onClick={() => handleDelete(video.id)} className="p-2 text-white bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />

            <VideoUploadModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => fetchVideos(currentPage)}
            />
        </div>
    );
}

export default VideosList;