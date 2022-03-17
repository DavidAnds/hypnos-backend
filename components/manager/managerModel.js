const { DataTypes, Sequelize } = require('sequelize');
const Database = require('../database/database');
const Hotel = require('../hotel/hotelModel');

const Manager = Database.define('managers', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        AllowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        AllowNull: false,
        validate: {
            isEmail: true,
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
});

Manager.belongsTo(Hotel);

module.exports = Manager;
