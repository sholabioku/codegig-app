const Sequelize = require('sequelize');

module.exports = new Sequelize('codegig', 'bilush', '5346', {
  host: 'localhost',
  dialect: 'postgres',
});
