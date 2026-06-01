const User = require('./User');
const Course = require('./Course');
const Enrollment = require('./Enrollment');
const { db } = require('../config/db');

// Associations
User.hasMany(Enrollment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Course.hasMany(Enrollment, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(User, { foreignKey: 'user_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });
User.belongsToMany(Course, {through: Enrollment, foreignKey: 'user_id' });
Course.belongsToMany(User, {through: Enrollment, foreignKey: 'course_id' })

module.exports = {
    User,
    Course,
    Enrollment,
    db
};
