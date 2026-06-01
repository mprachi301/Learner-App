const router = require('express').Router();
const CourseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.post('/', authMiddleware, roleMiddleware(['admin', 'manager']), CourseController.createCourse);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'manager']), CourseController.deleteCourse);
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'manager', 'learner']), CourseController.getCourseById);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'manager']), CourseController.updateCourse);
router.get('/', authMiddleware, roleMiddleware(['admin', 'manager', 'learner']), CourseController.getAllCourses);

module.exports = router;