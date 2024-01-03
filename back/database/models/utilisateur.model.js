const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Assurez-vous que ce chemin est correct

const Utilisateur = sequelize.define('Utilisateur', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: DataTypes.TEXT,
    prenom: DataTypes.TEXT,
    adresse: DataTypes.TEXT,
    codepostal: DataTypes.CHAR(5),
    ville: DataTypes.TEXT,
    email: DataTypes.TEXT,
    sexe: DataTypes.CHAR(1),
    login: DataTypes.TEXT,
    password: DataTypes.TEXT,
    telephone: DataTypes.CHAR(20)
}, {
    tableName: 'utilisateurs',
    timestamps: false
});

module.exports = Utilisateur;
