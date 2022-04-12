const { DataTypes, Sequelize } = require('sequelize');
const Database = require('../database/database');


const User = Database.define('users', {
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
    }
});



module.exports = User;
