module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subcategories',
        key: 'id'
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statement: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true // ここにnullを許可することを指定
    },
    access_level: {
      type: DataTypes.ENUM('unauthorized', 'free', 'paid', 'admin'),
      allowNull: false,
      defaultValue: 'unauthorized'  // デフォルト値を 'unauthorized' に設定
    },
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Category, { foreignKey: 'category_id' });
    Question.belongsTo(models.Subcategory, { foreignKey: 'subcategory_id' });
    Question.hasMany(models.QuestionChoice, {
      foreignKey: 'question_id',
      as: 'QuestionChoices'
    });
    Question.hasMany(models.UserAnswer, { foreignKey: 'question_id' });
  };

  return Question;
};
