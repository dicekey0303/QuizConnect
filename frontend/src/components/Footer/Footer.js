import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom">
          <p>&copy; 2024 AGEST Quiz Connect. All rights reserved.</p>
          <a href="mailto:info@quizconnect.com">お問い合わせ: info@quizconnect.com</a>
          <Link to="/privacy-policy">プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;