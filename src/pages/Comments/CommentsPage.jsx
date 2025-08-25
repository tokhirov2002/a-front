import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Loader from '../../components/common/Loader';
import CommentThread from './CommentThread';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

const CommentsPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos/');
        
        // TO'G'IRLANGAN QISM: Ma'lumotlar endi .results ichidan olinadi
        const formatted = (response.data.results || []).map(v => ({...v, video_url: `${BACKEND_URL}${v.video_file}`}));
        
        setVideos(formatted);
        if (formatted.length > 0) {
          setSelectedVideo(formatted[0]); // Birinchisini avtomatik tanlash
        }
      } catch (error) {
        console.error("Videolarni yuklashda xatolik", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chap qism: Videolar ro'yxati */}
      <div className="w-1/3 overflow-y-auto bg-white border-r">
        <h2 className="p-4 text-xl font-bold border-b">Videolar</h2>
        <ul>
          {videos.map(video => (
            <li
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`flex p-4 border-b cursor-pointer hover:bg-gray-100 ${selectedVideo?.id === video.id ? 'bg-indigo-50' : ''}`}
            >
              <video src={video.video_url} className="w-20 h-20 object-cover rounded" />
              <div className="ml-4">
                <p className="font-semibold">{video.institution?.name}</p>
                <p className="text-sm text-gray-600 truncate">{video.caption}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* O'ng qism: Kommentlar */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {selectedVideo ? (
          <CommentThread videoId={selectedVideo.id} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Kommentlarni ko'rish uchun videoni tanlang</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsPage;