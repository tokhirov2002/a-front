import api from './api';

export const getCommentsForVideo = (videoId) => {
  return api.get(`/comments/?video_post=${videoId}`);
};

export const postComment = (data) => {
  // data = { video_post: ID, text: "matn", reply_to: ID (ixtiyoriy) }
  return api.post('/comments/', data);
};