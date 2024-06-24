import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionById, updateQuestion } from '../../api/questions';
import { getCategories } from '../../api/category';
import { getSubcategories } from '../../api/subcategory';
import './QuestionEditPage.css';

const QuestionEditPage = () => {
  // try {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [formData, setFormData] = useState({
    categoryId: '',
    subcategoryId: '',
    title: '',
    statement: '',
    difficulty: '',
    access_level: '',
    explanation: '',
    choices: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
//   バリデーション用のエラーセット
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);


  // useEffect(() => {
  //   const fetchQuestion = async () => {
  //     try {
  //       const fetchedQuestion = await getQuestionById(id);
  //       console.log('Fetched question:', fetchedQuestion); // デバッグ用ログ
  //       setQuestion(fetchedQuestion);
  //       setFormData({
  //         categoryId: fetchedQuestion.Category.id,
  //         subcategoryId: fetchedQuestion.Subcategory.id,
  //         title: fetchedQuestion.title,
  //         statement: fetchedQuestion.statement,
  //         difficulty: fetchedQuestion.difficulty,
  //         access_level: fetchedQuestion.access_level || '',
  //         explanation: fetchedQuestion.explanation,
  //       });
  //       console.log('Form data after fetch:', formData); // デバッグ用
  //       setIsLoading(false);

  //       // カテゴリとサブカテゴリもここで取得
  //       const fetchedCategories = await getCategories();
  //       const fetchedSubcategories = await getSubcategories();
  //       setCategories(fetchedCategories);
  //       setSubcategories(fetchedSubcategories);

  //     } catch (error) {
  //       setError('Failed to fetch question');
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchQuestion();
  // }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedQuestion,fetchedCategories, fetchedSubcategories] = await Promise.all([
        getQuestionById(id),
        getCategories(),
        getSubcategories(),
        ]);

        setQuestion(fetchedQuestion);
        setCategories(fetchedCategories);
        setSubcategories(fetchedSubcategories);
        setFormData({
          categoryId: fetchedQuestion.Category.id,
          subcategoryId: fetchedQuestion.Subcategory.id,
          title: fetchedQuestion.title,
          statement: fetchedQuestion.statement,
          difficulty: fetchedQuestion.difficulty,
          access_level: fetchedQuestion.access_level,
          explanation: fetchedQuestion.explanation,
          choices: fetchedQuestion.QuestionChoices ? fetchedQuestion.QuestionChoices.map(choice => ({
            id: choice.id,
            choice_text: choice.choice_text,
            is_correct: choice.is_correct
          })) : []
        });
        setIsLoading(false);
    } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch question data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.categoryId) {
      newErrors.categoryId = 'カテゴリを選択してください';
    }

    if (!formData.subcategoryId) {
      newErrors.subcategoryId = 'サブカテゴリを選択してください';
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
          await updateQuestion(id, formData);
          navigate('/questions');
        } catch (error) {
          setError('Failed to update question');
        }
      }
    };

  const handleChoiceChange = (index, field, value) => {
    const newChoices = [...formData.choices];
    newChoices[index][field] = value;
    setFormData({ ...formData, choices: newChoices });
  };



  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }


  console.log('Rendering QuestionEditPage:', { question, formData, isLoading, error });
  return (
    <div className="question-edit-page">
      <h1>Edit Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryId">Category:</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
          </select>
          {errors.categoryId && <span className="error">{errors.categoryId}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="subcategoryId">Subcategory:</label>
          <select
            id="subcategoryId"
            name="subcategoryId"
            value={formData.subcategoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
          </select>
          {errors.subcategoryId && <span className="error">{errors.subcategoryId}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
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
            required
          ></textarea>
          {errors.statement && <span className="error">{errors.statement}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <input
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          />
          {errors.difficulty && <span className="error">{errors.difficulty}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="access_level">Access Level:</label>
          <select
            id="access_level"
            name="access_level"
            value={formData.access_level  || ''}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select access level</option>
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
            required
          ></textarea>
          {errors.explanation && <span className="error">{errors.explanation}</span>}
        </div>

        <h2>Choices</h2>
        {formData.choices && formData.choices.length > 0 ? (
          formData.choices.map((choice, index) => (
            <div key={index} className="choice-edit">
              <input
                type="text"
                value={choice.choice_text}
                onChange={(e) => handleChoiceChange(index, 'choice_text', e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={choice.is_correct}
                  onChange={(e) => handleChoiceChange(index, 'is_correct', e.target.checked)}
                />
                Correct Answer
              </label>
            </div>
          ))
        ) : (
          <p>No choices available</p>
        )}


        <button type="submit">Update Question</button>
      </form>
    </div>
  );

// return (
//   <div className="question-edit-page">
//     <h1>Edit Question</h1>
//     <pre>{JSON.stringify(formData, null, 2)}</pre>
//   </div>
// );
//   } catch (error) {
//   console.error('Render error:', error);
//   return <div>An error occurred: {error.message}</div>;
// }
};

export default QuestionEditPage;
