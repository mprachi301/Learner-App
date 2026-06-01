const { Enrollment } = require('../models')
const { Course } = require('../models')

class EnrollmentService {
    static async enroll(userId, courseId){
        if (!userId || !courseId){
            throw new Error("User Id and Course Id are required");
        }
        const course = await Course.findOne({ where: { id: courseId }});
        if (!course){
            throw new Error("Course not found");
        }
        const enrollment = await Enrollment.create({ user_id: userId, course_id: courseId })
        return enrollment;
    }   

    static async getMyEnrollments(userId){
        const enrollments = await Enrollment.findAll({ where: {user_id: userId }});
        return enrollments;
    }

    //'enrolled', 'in_progress', 'completed', 'dropped'
    static async updateProgress(userId, courseId, progress){
        const enrollment = await Enrollment.findOne({ where: {user_id: userId, course_id: courseId}});
        if (!enrollment){
            throw new Error("You are not enrolled in the course")
        }
        if (progress >= 100){
            await enrollment.update({progress: progress, status: 'completed'})
        }
        else if (progress > enrollment.progress){
            await enrollment.update({progress: progress, status: 'in_progress'})
        }
        else{
            throw new Error("Progress can't go backwards")
        }
        await enrollment.reload();
        return enrollment
    }

    static async dropEnrollment(userId, courseId){
        const enrollment = await Enrollment.findOne({ where: { user_id: userId, course_id: courseId }});
        if (!enrollment){
            throw new Error("Enrollment not found")
        }
        if (enrollment.status=='completed'){
            throw new Error("Can't drop a completed course")
        }
        await enrollment.update({status: 'dropped'});
        return enrollment
    }
}

module.exports = EnrollmentService;