const { DataTypes, Sequelize } = require('sequelize');
const Database = require('../database/database');


const Reservation = Database.define('reservations', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        AllowNull: false,
    },
    suiteId: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    startDate: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    endDate: {
        type: DataTypes.STRING,
        AllowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        AllowNull: false,
    }
});



module.exports = Reservation;
