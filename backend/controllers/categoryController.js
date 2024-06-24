const { Category } = require('../models');

// カテゴリ一覧の取得
exports.getCategories = async (req, res) => {
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'name'],
      });
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'サーバーエラー' });
    }
  };

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name']
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};
