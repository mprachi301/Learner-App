const { Course } = require('../models');
const { Op } = require('sequelize');

class CourseService {
    static async createCourse(courseData, userId) {
        if (!courseData.course_name){
            throw new Error("Course name is required");
        }
        const existingCourse = await Course.findOne({ where: {course_name: courseData.course_name} });
        if(existingCourse){
            throw new Error("Course with this name already exists");
        }
        const course = await Course.create({ ...courseData, created_by: userId })
        return course;
    }

    static async getAllCourses(filters={}) {
        const { course_name, course_type } = filters;
        const where = {};
        if (course_name) where.course_name = { [Op.like]: `%${course_name}%`};
        if (course_type) where.course_type = course_type;
        const courses = await Course.findAll({ where });
        return courses;
    }

    static async getCourseById(courseId) {
        const course = await Course.findByPk(courseId);
        if(!course){
            throw new Error("Course not found");
        }
        return course;
    }

    static async updateCourse(courseId, courseData){
        const course = await this.getCourseById(courseId);
        await course.update(courseData);
        return course;
    }

    static async deleteCourse(courseId){
        const course = await this.getCourseById(courseId);
        await course.destroy();
        return;
    }
}

module.exports = CourseService;;