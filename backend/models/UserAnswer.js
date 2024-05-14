module.exports = (sequelize, DataTypes) => {
    const UserAnswer = sequelize.define('UserAnswer', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id'
        }
      },
      selected_choice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'QuestionChoices',
          key: 'id'
        }
      }
    });
  
    UserAnswer.associate = (models) => {
      UserAnswer.belongsTo(models.User, { foreignKey: 'user_id' });
      UserAnswer.belongsTo(models.Question, { foreignKey: 'question_id' });
      UserAnswer.belongsTo(models.QuestionChoice, { foreignKey: 'selected_choice_id' });
    };
  
    return UserAnswer;
  };