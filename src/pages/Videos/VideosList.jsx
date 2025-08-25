
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const VideosList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const response = await api.get('/videos/');
                setVideos(response.data);
            } catch (error) {
                console.error("Videolarni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) return <div>Yuklanmoqda...</div>;

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Videolar</h1>
                <button className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    + Video joylash
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map(video => (
                    <div key={video.id} className="overflow-hidden bg-white rounded-lg shadow-md">
                        <video controls className="w-full h-48 object-cover">
                           {/* Backend `video_file` uchun to'liq URL qaytarishi kerak */}
                           <source src={video.video_file} type="video/mp4" />
                           Sizning brauzeringiz video tegini qo'llab-quvvatlamaydi.
                        </video>
                        <div className="p-4">
                            <p className="font-semibold text-gray-800">{video.institution.name}</p>
                            <p className="mt-2 text-sm text-gray-600 truncate">{video.caption}</p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-full">{video.platform}</span>
                                <span className="text-sm text-gray-500">{new Date(video.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VideosList;