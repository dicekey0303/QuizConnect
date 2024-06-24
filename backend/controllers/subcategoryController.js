const { Subcategory } = require('../models');

// サブカテゴリ一覧の取得
exports.getSubcategories = async (req, res) => {
    try {
      const subcategories = await Subcategory.findAll({
        attributes: ['id', 'name', 'category_id'],
      });
      res.status(200).json(subcategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'サーバーエラー' });
    }
  };

exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      attributes: ['id', 'name', 'category_id']
    });
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};
