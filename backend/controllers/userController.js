const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ユーザー登録
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });
    res.status(201).json({ message: 'ユーザー登録が完了しました' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// ログイン
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email, password); // ログを追加
  console.log('Request body:', req.body); // リクエストボディをログ出力
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found'); // ログを追加
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが無効です' });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password'); // ログを追加
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが無効です' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    console.log('Login successful:', user.email, user.role); // ログを追加
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Login successful',error);
    console.error('Login error:', error);
    if (error instanceof SyntaxError) {
      res.status(400).json({ message: 'リクエストボディが不正なJSONフォーマットです' });
    } else {
      res.status(500).json({ message: 'サーバーエラー' });
    }
  }
};

// ユーザー情報の取得
exports.getUserProfile = async (req, res) => {
  console.log('Request body:', req.body);
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'username', 'email', 'role']
    });
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof SyntaxError) {
      res.status(400).json({ message: 'Invalid JSON format' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};