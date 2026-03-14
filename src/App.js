import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import PagesList from './pages/PagesList';
import PageEdit from './pages/PageEdit';
import BlogsList from './pages/BlogsList';
import BlogCreate from './pages/BlogCreate';
import BlogEdit from './pages/BlogEdit';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="pages" element={<PagesList />} />
            <Route path="pages/:slug" element={<PageEdit />} />
            <Route path="blogs" element={<BlogsList />} />
            <Route path="blogs/new" element={<BlogCreate />} />
            <Route path="blogs/:slug" element={<BlogEdit />} />
          </Route>
          
          {/* Redirect to dashboard if accessing root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
