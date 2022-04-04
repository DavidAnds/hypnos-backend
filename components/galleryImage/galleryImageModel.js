const { DataTypes, Sequelize } = require('sequelize');
const Suite = require('../suite/suiteModel')
const Database = require('../database/database');

const GalleryImage = Database.define('galleryImage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        AllowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

GalleryImage.belongsTo(Suite);

module.exports = GalleryImage;