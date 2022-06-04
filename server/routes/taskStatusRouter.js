const Router = require('express');
const router = new Router();

const taskStatusController = require('../controllers/taskStatusController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), taskStatusController.create );
router.get('/', taskStatusController.getAll )

module.exports = router;