import api from './index';
import axios from 'axios';


export const getQuestions = async (role, searchParams = {}) => {
  try {
    let url = '/questions?';
    if (role) {
      if (role === 'admin') {
        url += 'access_level=unauthorized,free,paid,admin&';
      } else if (role === 'paid') {
        url += 'access_level=unauthorized,free,paid&';
      } else if (role === 'free') {
        url += 'access_level=unauthorized,free&';
      }
    } else {
      url += 'access_level=unauthorized&';
    }

    if (searchParams.category) url += `category=${searchParams.category}&`;
    if (searchParams.subcategory) url += `subcategory=${searchParams.subcategory}&`;
    if (searchParams.difficulty) url += `difficulty=${searchParams.difficulty}&`;

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch questions');
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const getSubcategories = async () => {
  try {
    const response = await api.get('/subcategories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch subcategories');
  }
};

export const updateQuestion = async (questionId, questionData) => {
    try {
      const response = await api.put(`/questions/${questionId}`, questionData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update question');
    }
  };

  export const deleteQuestion = async (questionId) => {
    try {
      await api.delete(`/questions/${questionId}`);
    } catch (error) {
      throw new Error('Failed to delete question');
    }
  };

  // ...

  export const getQuestionById = async (questionId) => {
    try {
      const response = await api.get(`/questions/${questionId}`, {
        params: {
          include: 'QuestionChoices',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch question');
    }
  };

  // ...
  export const getQuestionsByCategoryId = async (categoryId) => {
    try {
      const response = await api.get(`/questions/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions by category:', error);
      throw error;
    }
  };

export const createQuestion = async (questionData) => {
  try {
    const response = await api.post('/questions', questionData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create question');
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get('/categories/all');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const getAllSubcategories = async () => {
  try {
    const response = await api.get('/subcategories/all');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch subcategories');
  }
};

export const getDifficulties = async () => {
  try {
    const response = await api.get('/questions/difficulties');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch difficulties');
  }
};
