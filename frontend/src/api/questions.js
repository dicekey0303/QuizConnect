import api from './index';
import axios from 'axios';

export const getQuestions = async (role) => {
    try {
      let response;
      if (role === 'admin') {
        response = await api.get('/questions');
      } else if (role === 'paid') {
        response = await api.get('/questions?access_level=free,paid,unauthorized');
      } else if (role === 'free') {
        response = await api.get('/questions?access_level=free,unauthorized');
      } else {
        response = await api.get('/questions?access_level=unauthorized');
      }
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch questions');
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
