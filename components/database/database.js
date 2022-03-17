const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('hypnos_db', 'root', 'root', {
    dialect: 'mariadb',
    host: 'localhost',
});

module.exports = sequelize
