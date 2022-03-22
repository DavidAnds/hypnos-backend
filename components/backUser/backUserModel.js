const { DataTypes, Sequelize } = require('sequelize');
const Database = require('../database/database');
const Hotel = require('../hotel/hotelModel');

const BackUser = Database.define('backUsers', {
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
    role: {
        type: DataTypes.STRING,
        defaultValue: "manager"
    }
});

BackUser.belongsTo(Hotel);

module.exports = BackUser;
