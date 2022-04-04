const { DataTypes, Sequelize } = require('sequelize');
const Hotel = require('../hotel/hotelModel');
const Database = require('../database/database');

const Suite = Database.define('suites', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        AllowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    bookingLink: {
        type: DataTypes.STRING,
    },
    imageURL: {
        type: DataTypes.STRING,
    },
    imageDescription: {
        type: DataTypes.STRING,
    },
});

Suite.belongsTo(Hotel);

module.exports = Suite;
