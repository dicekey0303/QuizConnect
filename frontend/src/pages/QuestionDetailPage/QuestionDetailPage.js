import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getQuestionById, getQuestionsByCategoryId } from '../../api/questions';
import './QuestionDetailPage.css';



const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const fetchedQuestion = await getQuestionById(id);
        setQuestion(fetchedQuestion);

        // 現在の問題のカテゴリIDを取得
        const categoryId = fetchedQuestion.Category.id;

        // 同じカテゴリの問題を取得
        const categoryQuestions = await getQuestionsByCategoryId(categoryId);
        setCategoryQuestions(categoryQuestions);

        // 現在の問題のインデックスを取得
        const index = categoryQuestions.findIndex((q) => q.id === Number(id));
        setCurrentQuestionIndex(index);

        // 選択肢、正解/不正解の表示、解説の表示をリセット
        setSelectedChoice(null);
        setShowExplanation(false);
      } catch (error) {
        console.error('Failed to fetch question:', error);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question || !question.QuestionChoices) {
    return <div className="loading">Loading...</div>;
  }

  const handleChoiceSelect = (choiceId) => {
    setSelectedChoice(choiceId);
    setShowExplanation(true);
  };

  const isCorrectChoice = selectedChoice && question.QuestionChoices.find(
    (choice) => choice.id === selectedChoice
  )?.is_correct;

  const handlePrevQuestion = () => {
    // 前の問題に遷移する処理を追加
    if (categoryQuestions.length === 0) return;
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      const prevQuestionId = categoryQuestions[prevIndex].id;
      navigate(`/questions/${prevQuestionId}`);
    }
  };

  const handleNextQuestion = () => {
    if (categoryQuestions.length === 0) return;
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < categoryQuestions.length) {
      const nextQuestionId = categoryQuestions[nextIndex].id;
      navigate(`/questions/${nextQuestionId}`);
    }
  };
  const handleGoBack = () => {
    navigate('/questions');
  };

  return (
    <div className="question-detail-page">
      <h1>{question.title}</h1>
      <p>{question.statement}</p>
      {/* 解答選択肢と解説を追加 */}
      <div className="choices">
        {question.QuestionChoices.map((choice) => (
          <button
            key={choice.id}
            className={`choice ${selectedChoice === choice.id ? 'selected' : ''}`}
            onClick={() => handleChoiceSelect(choice.id)}
            disabled={selectedChoice !== null}
          >
            {choice.choice_text}
          </button>
        ))}
      </div>
      {/* 正解/不正解を判定 */}
      {selectedChoice && (
        <div className={`result ${isCorrectChoice ? 'correct' : 'incorrect'}`}>
          {isCorrectChoice ? '正解です！' : '不正解です。'}
        </div>
      )}
      {/* 解説を追加 */}
      {showExplanation && (
        <div className="explanation">
          <h2>解説</h2>
          <p>{question.explanation}</p>
        </div>
      )}
      <div className="navigation">
      <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
        前の問題
      </button>
      <button onClick={handleNextQuestion} disabled={currentQuestionIndex === categoryQuestions.length - 1}>
        次の問題
      </button>
      </div>
      <button onClick={handleGoBack}>戻る</button>
    </div>
  );
};

export default QuestionDetailPage;