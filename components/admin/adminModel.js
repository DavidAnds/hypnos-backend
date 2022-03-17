const { DataTypes, Sequelize } = require('sequelize');
const Database = require('../database/database');

const admin = Database.define('admins', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        AllowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        AllowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
});

module.exports = admin;
