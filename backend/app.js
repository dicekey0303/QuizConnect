require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// ミドルウェアの設定
app.use(express.json());
// CORSミドルウェアを追加
app.use(cors());


// ルーティングの設定
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const communityRoutes = require('./routes/communityRoutes');

app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
// app.use('/api/community', communityRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// サーバーの起動
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

