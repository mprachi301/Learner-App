const { db } = require('../config/db');
const { DataTypes } = require('sequelize');

const Enrollment = db.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('enrolled', 'in_progress', 'completed', 'dropped'),
        allowNull: false,
        defaultValue: 'enrolled'
    },
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'course_id']
        }
    ]   
})

module.exports = Enrollment;