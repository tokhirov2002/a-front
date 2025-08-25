import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './layout/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// Sahifalar
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import InstitutionsList from './pages/Institutions/InstitutionsList';
import VideosList from './pages/Videos/VideosList';
// Boshqa sahifalarni import qilish kerak bo'ladi
import CommentsPage from './pages/Comments/CommentsPage'; // Import qilamiz
import StatsPage from './pages/Stats/StatsPage'; // Import


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/institutions" element={<InstitutionsList />} />
              <Route path="/videos" element={<VideosList />} />
              <Route path="/comments" element={<CommentsPage />} /> {/* Yangi Route */}
              <Route path="/stats" element={<StatsPage />} /> {/* Yangi Route */}
              {/* Boshqa sahifalar uchun Route'lar shu yerga qo'shiladi */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;