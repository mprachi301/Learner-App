const { db } = require('../config/db');
const { DataTypes } = require('sequelize');

const User = db.define('User', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'learner', 'manager'),
        allowNull: false,
        defaultValue: 'learner'
    }
}, { timestamps: true })

module.exports = User;