const { db } = require('../config/db');
const { DataTypes } = require('sequelize');

const Course = db.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    course_type: {
        type: DataTypes.STRING
    },
    course_duration: {
        type: DataTypes.INTEGER
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: true })

module.exports = Course;