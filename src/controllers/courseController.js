const CourseService = require('../services/courseService');

class CourseController {
    static async createCourse(req, res) {
        try {
            const course = await CourseService.createCourse(req.body, req.user.id);
            res.status(201).json({ success: true, message: "Course created successfully", data: course }); 
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : error.message.includes('required') ? 400 : error.message.includes('already exists') ? 409 : 500
            res.status(status).json({ success: false, error: error.message });
        }
    }

    static async getAllCourses(req, res) {
        try{
            const courses = await CourseService.getAllCourses(req.query);
            res.status(200).json({ success: true, data: courses }); 
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : error.message.includes('required') ? 400 : error.message.includes('already exists') ? 409 : 500
            res.status(status).json({ success: false, error: error.message });
        }
    }

    static async getCourseById(req, res) {
        try {
            const course = await CourseService.getCourseById(req.params.id)
            res.status(200).json({ success: true, data: course });
        } catch (error){
            const status = error.message.includes('not found') ? 404 : error.message.includes('required') ? 400 : error.message.includes('already exists') ? 409 : 500
            res.status(status).json({ success: false, error: error.message });
        }
    }

    static async updateCourse(req, res){
        try {
            const course = await CourseService.updateCourse(req.params.id, req.body);
            res.status(200).json({ success: true, message: "Course updated successfully", data: course });
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : error.message.includes('required') ? 400 : error.message.includes('already exists') ? 409 : 500
            res.status(status).json({ success: false, error: error.message });
        }
    }

    static async deleteCourse(req,res) {
        try {
            await CourseService.deleteCourse(req.params.id);
            res.status(200).json({ success: true, message: "Course deleted successfully" })
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : error.message.includes('required') ? 400 : error.message.includes('already exists') ? 409 : 500
            res.status(status).json({ success: false, error: error.message });
        }
    }
}

module.exports = CourseController;