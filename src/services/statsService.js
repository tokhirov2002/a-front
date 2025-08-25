import api from './api';

export const getSummaryStats = () => {
  return api.get('/stats/summary/');
};

export const getVideoStats = (videoId) => {
  return api.get(`/stats/video/${videoId}/`);
};