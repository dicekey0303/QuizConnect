import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getQuestions, deleteQuestion, getAllCategories, getAllSubcategories, getDifficulties } from '../../api/questions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './QuestionsPage.css';

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [searchParams, setSearchParams] = useState({
    category: '',
    subcategory: '',
    difficulty: ''
  });
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsData, categoriesData, subcategoriesData, difficultiesData] = await Promise.all([
          getQuestions(role),
          getAllCategories(),
          getAllSubcategories(),
          getDifficulties()
        ]);
        console.log('Fetched data:', { questionsData, categoriesData, subcategoriesData, difficultiesData });
        setQuestions(questionsData);
        setCategories(categoriesData);
        setSubcategories(subcategoriesData);
        setDifficulties(difficultiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [role]);

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const filteredQuestions = await getQuestions(role, searchParams);
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error('Error searching questions:', error);
    }
  };

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

      <div className="search-form">
        <select name="category" onChange={handleSearchChange} value={searchParams.category}>
          <option value="">全てのカテゴリ</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <select name="subcategory" onChange={handleSearchChange} value={searchParams.subcategory}>
          <option value="">全てのサブカテゴリ</option>
          {subcategories.map(subcategory => (
            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
          ))}
        </select>
        <select name="difficulty" onChange={handleSearchChange} value={searchParams.difficulty}>
          <option value="">全ての難易度</option>
          {difficulties.map(difficulty => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </select>
        <button onClick={handleSearch}>検索</button>
      </div>


      <div className="question-list">
        {questions.map((question) => (
          <div key={question.id} className="question-item">
            <h2 className="question-title">{question.title}</h2>
            <div className="question-details">
              <p className="question-category">カテゴリ: {question.category}</p>
              <p className="question-subcategory">サブカテゴリ: {question.subcategory}</p>
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
