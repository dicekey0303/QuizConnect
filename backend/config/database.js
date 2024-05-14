const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('quizconnect', 'qc_user', 'qc_pass', {
  host: 'db',
  dialect: 'mysql',
});

module.exports = sequelize;