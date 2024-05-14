import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Quiz Connect</Link>
      </div>
      <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to="/questions">問題一覧</Link>
          </li>
          <li>
            <Link to="/community">コミュニティ</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">ダッシュボード</Link>
              </li>
              <li>
                <button onClick={handleLogout}>ログアウト</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">ログイン</Link>
              </li>
              <li>
                <Link to="/register">登録</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </div>
    </header>
  );
};

export default Header;