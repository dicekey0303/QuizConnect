import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getQuestions, deleteQuestion } from '../../api/questions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './QuestionsPage.css';

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions(role);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [isAuthenticated, role]);

  const handleEditQuestion = (questionId) => {
    // TODO: 問題編集ページへ遷移する処理を追加
    navigate(`/questions/${questionId}/edit`);
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestion(questionId);
      setQuestions(questions.filter((question) => question.id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="question-page">
      <h1 className="question-page-title">問題一覧</h1>
      <div className="question-list">
        {questions.map((question) => (
          <div key={question.id} className="question-item">
            <h2 className="question-title">{question.title}</h2>
            <div className="question-details">
              <p className="question-category">カテゴリ: {question.Category.name}</p>
              <p className="question-subcategory">サブカテゴリ: {question.Subcategory.name}</p>
              <p className="question-difficulty">難易度: {question.difficulty}</p>
            </div>
            <Link to={`/questions/${question.id}`} className="question-link">
              詳細を見る
            </Link>
            {isAuthenticated && role === 'admin' && (
              <div className="question-actions">
                <button className="question-edit-btn" onClick={() => handleEditQuestion(question.id)}>
                  編集
                </button>
                <button className="question-delete-btn" onClick={() => handleDeleteQuestion(question.id)}>
                  削除
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;