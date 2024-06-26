const { Question, Category, Subcategory, QuestionChoice } = require('../models');

// 問題一覧の取得
exports.getQuestions = async (req, res) => {
  try {
    const { access_level } = req.query;
    const where = {};

    if (access_level) {
      where.access_level = access_level.split(',');
    }

    const questions = await Question.findAll({
      where,
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Subcategory, attributes: ['id', 'name'] }
      ],
      attributes: ['id', 'title', 'difficulty', 'access_level']
    });

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// 問題の詳細情報の取得
exports.getQuestionById = async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await Question.findByPk(questionId, {
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Subcategory, attributes: ['id', 'name'] },
        { model: QuestionChoice, attributes: ['id', 'choice_text', 'is_correct'] },
      ],
    });
    if (!question) {
      return res.status(404).json({ message: '問題が見つかりません' });
    }
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// 新しい問題の作成
exports.createQuestion = async (req, res) => {
  const { categoryId, subcategoryId, title, statement, difficulty, explanation } = req.body;
  try {
    const question = await Question.create({
      category_id: categoryId,
      subcategory_id: subcategoryId,
      title,
      statement,
      difficulty,
      explanation
    });
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// 問題の更新
exports.updateQuestion = async (req, res) => {
  const questionId = req.params.id;
  const { categoryId, subcategoryId, title, statement, difficulty, access_level, explanation } = req.body;
  try {
    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: '問題が見つかりません' });
    }
    await question.update({
      category_id: categoryId,
      subcategory_id: subcategoryId,
      title,
      statement,
      difficulty,
      access_level,
      explanation
    });
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// 問題の削除
exports.deleteQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: '問題が見つかりません' });
    }
    await question.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// ロールに基づいた問題取得
exports.getQuestionsByRole = async (req, res) => {
  const userRole = req.userRole;
  try {
    let questions;
    if (userRole === 'admin') {
      questions = await Question.findAll({
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Subcategory, attributes: ['id', 'name'] }
        ],
        attributes: ['id', 'title', 'difficulty']
      });
    } else if (userRole === 'paid') {
      questions = await Question.findAll({
        where: {
          difficulty: ['easy', 'medium']
        },
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Subcategory, attributes: ['id', 'name'] }
        ],
        attributes: ['id', 'title', 'difficulty']
      });
    } else {
      questions = await Question.findAll({
        where: {
          difficulty: 'easy'
        },
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Subcategory, attributes: ['id', 'name'] }
        ],
        attributes: ['id', 'title', 'difficulty']
      });
    }
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// カテゴリに基づいた問題取得
exports.getQuestionsByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const questions = await Question.findAll({
      where: {
        category_id: categoryId
      },
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Subcategory, attributes: ['id', 'name'] }
      ],
      attributes: ['id', 'title', 'difficulty']
    });
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};