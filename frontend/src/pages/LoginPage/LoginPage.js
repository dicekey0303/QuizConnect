import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext'; // AuthContextからuseAuthをimport


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: loginContext } = useAuth(); // useAuthからlogin関数を取得
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, role } = await login({ email, password });
      // 状態更新を待つための遅延
      // await new Promise((resolve) => setTimeout(resolve, 0)); 

      // コールバック関数用
      // loginContext(token, role, () => {
      //   navigate('/dashboard');});
      
      // AuthContextのlogin関数を呼び出してログイン状態を更新
      loginContext(token, role);
      navigate('/dashboard');
      
    } catch (error) {
      setError('ログインに失敗しました');
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default LoginPage;
