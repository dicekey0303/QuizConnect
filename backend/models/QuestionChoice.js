module.exports = (sequelize, DataTypes) => {
  const QuestionChoice = sequelize.define('QuestionChoice', {
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'id'
      }
    },
    choice_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    underscored: true,
  });

  QuestionChoice.associate = (models) => {
    QuestionChoice.belongsTo(models.Question, { foreignKey: 'question_id' });
  };

  return QuestionChoice;
};