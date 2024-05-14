import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { role } = useAuth();

  return (
    <div className="dashboard-page">
      <h1>ダッシュボード</h1>
      <p>ログイン中のユーザー: {role}</p>
      <div className="dashboard-content">
        <h2>ようこそ！</h2>
        <p>これは仮のダッシュボードページです。</p>
        <p>ここでは、ユーザーに関連する情報やアクションを表示します。</p>
        {role === 'admin' && (
          <div className="admin-section">
            <h3>管理者専用セクション</h3>
            <p>管理者向けの機能や情報をここに追加します。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;