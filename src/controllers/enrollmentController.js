const EnrollmentService = require('../services/enrollmentService')

class EnrollmentController{
    static async enroll(req, res){
        try {
            if (req.user.role == 'manager' && !req.body.user_id){
                throw new Error("User Id is required for manager")
            }
            const userId = req.user.role == 'manager' ? req.body.user_id : req.user.id;
            const courseId = req.body.course_id;
            const enrollment = await EnrollmentService.enroll(userId, courseId);
            res.status(201).json({ success: true, data: enrollment});
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : error.message.includes('required') ? 400 : error.message.includes('already exists') ? 409 : 500
            res.status(status).json({ success: false, error: error.message });
        }
    }

    static async getMyEnrollments(req, res){
        try {
            const userId = req.user.id;
            const enrollments = await EnrollmentService.getMyEnrollments(userId);
            res.status(200).json({ success: true, data: enrollments})
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : error.message.includes('required') ? 400 : error.message.includes('already exists') ? 409 : 500
            res.status(status).json({ success: false, error: error.message });
        }
    }

    static async updateProgress(req, res){
        try {
            const userId = req.user.id
            const courseId = req.body.course_id
            const progress = req.body.progress
            const enrollment = await EnrollmentService.updateProgress(userId, courseId, progress)
            res.status(200).json({ success: true, data: enrollment})
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : error.message.includes('required') ? 400 : error.message.includes('already exists') ? 409 : 500
            res.status(status).json({ success: false, error: error.message})
        }
    }

    static async dropEnrollment(req, res){
        try {
            if (req.user.role == 'manager' && !req.body.user_id){
                throw new Error("User Id is required for manager")
            }
            const userId = req.user.role == 'manager' ? req.body.user_id : req.user.id
            const courseId = req.params.id
            const enrollment = await EnrollmentService.dropEnrollment(userId, courseId)
            res.status(200).json({ success:true, message: 'Dropped enrollment successfully', data: enrollment })
        } catch (error){
            const status = error.message.includes('not found') ? 404 : error.message.includes('required') ? 400 : error.message.includes('already exists') ? 409 : 500
            res.status(status).json({ success: false, error: error.message})
        }
    }
}

module.exports = EnrollmentController