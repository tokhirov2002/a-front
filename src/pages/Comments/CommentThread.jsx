import React, { useState, useEffect, useCallback } from 'react';
import { getCommentsForVideo, postComment } from '../../services/commentService';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const CommentThread = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // qaysi kommentga javob yozilmoqda

  const fetchComments = useCallback(async () => {
    if (!videoId) return;
    setLoading(true);
    try {
      const response = await getCommentsForVideo(videoId);
      setComments(response.data);
    } catch (error) {
      console.error("Kommentlarni yuklashda xatolik", error);
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  
  const handlePostComment = async () => {
    if (!newCommentText.trim()) return;
    
    const payload = {
        video_post: videoId,
        text: newCommentText,
        reply_to: replyingTo,
    };

    try {
        await postComment(payload);
        toast.success("Javob muvaffaqiyatli yuborildi!");
        setNewCommentText('');
        setReplyingTo(null);
        fetchComments(); // Ro'yxatni yangilash
    } catch (error) {
        console.error("Komment yuborishda xatolik", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-y-auto">
        {comments.length === 0 ? (
            <p className="text-center text-gray-500">Hozircha kommentlar yo'q.</p>
        ) : (
            comments.map(comment => (
                <div key={comment.id} className="p-3 mb-4 bg-white rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-800">{comment.user?.full_name || 'Foydalanuvchi'}</p>
                    <p className="text-gray-600">{comment.text}</p>
                    <button onClick={() => setReplyingTo(comment.id)} className="mt-1 text-xs font-semibold text-indigo-600">Javob yozish</button>
                    {/* Javoblar (Replies) */}
                    {comment.replies && comment.replies.map(reply => (
                        <div key={reply.id} className="p-2 mt-2 ml-6 border-l-2 border-gray-200">
                            <p className="font-semibold text-gray-800">{reply.user?.full_name}</p>
                            <p className="text-gray-600">{reply.text}</p>
                        </div>
                    ))}
                </div>
            ))
        )}
      </div>
      <div className="p-4 bg-white border-t">
        {replyingTo && (
            <div className="mb-2 text-sm text-gray-500">
                IDsi {replyingTo} bo'lgan kommentga javob yozmoqdasiz.
                <button onClick={() => setReplyingTo(null)} className="ml-2 font-bold text-red-500">x</button>
            </div>
        )}
        <div className="relative">
            <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Javobingizni yozing..."
                className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button onClick={handlePostComment} className="absolute inset-y-0 right-0 flex items-center px-4 text-indigo-600">
                <PaperAirplaneIcon className="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default CommentThread;