import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Loader from '../../components/common/Loader';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsPage = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/stats/by-institution/');
        const data = response.data;
        
        // Chart.js uchun ma'lumotlarni formatlash
        const labels = data.map(item => item.name);
        const chartData = {
          labels,
          datasets: [
            {
              label: "Umumiy Like'lar",
              data: data.map(item => item.total_likes),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
              label: "Umumiy Kommentlar",
              data: data.map(item => item.total_comments),
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
            },
          ],
        };
        setStatsData(chartData);
      } catch (error) {
        console.error("Statistika yuklashda xatolik", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Muassasalar bo\'yicha faollik' },
    },
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Statistika</h1>
      <div className="p-4 mt-6 bg-white rounded-lg shadow">
        {statsData && <Bar options={options} data={statsData} />}
      </div>
    </div>
  );
};

export default StatsPage;