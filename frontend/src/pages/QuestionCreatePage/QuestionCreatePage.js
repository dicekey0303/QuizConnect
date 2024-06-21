import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../../api/questions';
import './QuestionCreatePage.css';

const QuestionCreatePage = () => {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    title: '',
    statement: '',
    difficulty: '',
    access_level: '',
    explanation: '',
  });
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctChoice, setCorrectChoice] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleCorrectChoiceChange = (e) => {
    setCorrectChoice(parseInt(e.target.value, 10));
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.category.trim()) {
      newErrors.category = 'カテゴリを入力してください';
    }

    if (!formData.subcategory.trim()) {
      newErrors.subcategory = 'サブカテゴリを入力してください';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'タイトルを入力してください';
    }

    if (!formData.statement.trim()) {
      newErrors.statement = '問題文を入力してください';
    }

    if (!formData.difficulty.trim()) {
      newErrors.difficulty = '難易度を入力してください';
    }

    if (!formData.access_level) {
      newErrors.access_level = 'アクセスレベルを選択してください';
    }

    if (!formData.explanation.trim()) {
      newErrors.explanation = '解説を入力してください';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const questionData = {
          ...formData,
          category_id: formData.category,
          subcategory_id: formData.subcategory,
          choices: choices.map((choice, index) => ({
            choice_text: choice,
            is_correct: index === correctChoice,
          })),
        };
        await createQuestion(questionData);
        navigate('/admin/questions');
      } catch (error) {
        console.error('Failed to create question', error);
      }
    }
  };

  return (
    <div className="question-create-page">
      <h1>Create Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory:</label>
          <input
            type="text"
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          />
          {errors.subcategory && <span className="error">{errors.subcategory}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="statement">Statement:</label>
          <textarea
            id="statement"
            name="statement"
            value={formData.statement}
            onChange={handleChange}
          ></textarea>
          {errors.statement && <span className="error">{errors.statement}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <input
            type="text"
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          />
          {errors.difficulty && <span className="error">{errors.difficulty}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="access_level">Access Level:</label>
          <select
            id="access_level"
            name="access_level"
            value={formData.access_level}
            onChange={handleChange}
          >
            <option value="">Select access level</option>
            <option value="unauthorized">Unauthorized</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            {/* <option value="admin">Admin</option> */}
          </select>
          {errors.access_level && <span className="error">{errors.access_level}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="explanation">Explanation:</label>
          <textarea
            id="explanation"
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
          ></textarea>
          {errors.explanation && <span className="error">{errors.explanation}</span>}
        </div>

        <div>
          <label>Choices:</label>
          {choices.map((choice, index) => (
            <div key={index}>
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div>
          <label>Correct Choice:</label>
          <select value={correctChoice} onChange={handleCorrectChoiceChange}>
            <option value={null}>Select correct choice</option>
            {choices.map((_, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Question</button>
      </form>
    </div>
  );
};

export default QuestionCreatePage;
