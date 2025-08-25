import React, { useState, useEffect } from 'react';
import { getSummaryStats } from '../services/statsService';
import api from '../services/api'; // So'nggi videolarni olish uchun
import StatCard from '../components/common/StatCard';
import Loader from '../components/common/Loader';
import { VideoCameraIcon, BuildingOffice2Icon, HandThumbUpIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentVideos, setRecentVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsResponse = await getSummaryStats();
        setStats(statsResponse.data);

        // So'nggi 5 ta videoni olish
        const videosResponse = await api.get('/videos/?limit=5');

        // TO'G'IRLANGAN QISM: Ma'lumotlar endi .results ichidan olinadi
        const formattedVideos = (videosResponse.data.results || []).map(video => ({
            ...video,
            video_url: `${BACKEND_URL}${video.video_file}`
        }));
        setRecentVideos(formattedVideos);

      } catch (error) {
        console.error("Dashboard ma'lumotlarini yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Bosh Sahifa</h1>
      
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Jami Videolar" value={stats?.total_videos || 0} icon={<VideoCameraIcon className="w-8 h-8"/>} />
        <StatCard title="Muassasalar" value={stats?.total_institutions || 0} icon={<BuildingOffice2Icon className="w-8 h-8"/>} />
        <StatCard title="Umumiy Like'lar" value={stats?.total_likes || 0} icon={<HandThumbUpIcon className="w-8 h-8"/>} />
        <StatCard title="Umumiy Kommentlar" value={stats?.total_comments || 0} icon={<ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8"/>} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">So'nggi Videolar</h2>
        <div className="mt-4 bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Video</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Muassasa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platforma</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sana</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentVideos.map(video => (
                  <tr key={video.id}>
                    <td className="px-6 py-4">
                      <video src={video.video_url} className="w-24 h-16 object-cover rounded" preload="metadata" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{video.institution?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">{video.platform}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(video.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;