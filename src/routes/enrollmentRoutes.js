const router = require('express').Router();
const EnrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.post('/', authMiddleware, roleMiddleware(['learner', 'manager', 'admin']), EnrollmentController.enroll);
router.get('/', authMiddleware, roleMiddleware(['learner', 'manager', 'admin']), EnrollmentController.getMyEnrollments);
router.put('/progress', authMiddleware, roleMiddleware(['learner', 'admin']), EnrollmentController.updateProgress);
router.put('/:id/drop', authMiddleware, roleMiddleware(['learner', 'manager', 'admin']), EnrollmentController.dropEnrollment)

module.exports = router;