import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TopPage from './pages/TopPage/TopPage';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage';
import QuestionEditPage from './pages/QuestionEditPage/QuestionEditPage';
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage';
import CommunityPage from './pages/CommunityPage/CommunityPage';
import AdminPage from './pages/AdminPage/AdminPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path="/questions" element={<QuestionsPage />} />
              <Route path="/questions/:id" element={<QuestionDetailPage />} />
              <Route path="/questions/:id/edit" element={<AdminRoute><QuestionEditPage /></AdminRoute>} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/admin/*" element={<AdminRoute><AdminPage /></AdminRoute>} />
          

              {/* <PrivateRoute path="/dashboard" element={<DashboardPage />} />
              <AdminRoute path="/admin/*" element={<AdminPage />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;