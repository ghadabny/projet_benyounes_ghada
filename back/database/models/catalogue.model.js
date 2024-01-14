const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Assurez-vous que ce chemin est correct

const Catalogue = sequelize.define('Catalogue', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: DataTypes.TEXT,
    ref: DataTypes.TEXT,
    titre: DataTypes.TEXT,
    description: DataTypes.TEXT,
    prix: DataTypes.FLOAT
}, {
    tableName: 'catalogue',
    timestamps: false
});

module.exports = Catalogue;
