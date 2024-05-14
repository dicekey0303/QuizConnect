import api from './index';

export const register = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (credentials) => {
  try {
    console.log('Login credentials:', credentials); // credentialsをログ出力
    const response = await api.post('/users/login', credentials);
    // デバッグログ
    console.log('Login response:', response.data);
    return {
      token: response.data.token,
      role: response.data.role
    };
  } catch (error) {
    console.error('Login error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('ログインリクエストに失敗しました');
    }
  }
};