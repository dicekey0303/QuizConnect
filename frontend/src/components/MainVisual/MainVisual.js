import React from 'react';
import { Link } from 'react-router-dom';
import './MainVisual.css';

const MainVisual = () => {
  return (
    <section className="main-visual">
      <div className="main-visual-content">
        <h1>Quiz Connectへようこそ！</h1>
        <p>
          知識を深め、スキルを向上させ、学習の楽しさを発見しましょう。
          Quiz Connectは、あなたの学習をサポートします。
        </p>
        <div className="main-visual-actions">
          <Link to="/questions" className="btn btn-primary">
            問題に挑戦する
          </Link>
          <Link to="/community" className="btn btn-secondary">
            コミュニティに参加する
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainVisual;