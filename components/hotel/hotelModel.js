const { DataTypes, Sequelize } = require('sequelize');
const Database = require('../database/database');

const hotel = Database.define('hotels', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        AllowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    adress: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    imageURL: {
        type: DataTypes.STRING
    },
    imageDescription: {
        type: DataTypes.TEXT
    }
});

module.exports = hotel