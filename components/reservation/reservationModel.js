const { DataTypes, Sequelize } = require('sequelize');
const Suite = require('../suite/suiteModel');
const Database = require('../database/database');

const Reservation = Database.define('reservations', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
    },
});

Reservation.belongsTo(Suite)
module.exports = Reservation;
