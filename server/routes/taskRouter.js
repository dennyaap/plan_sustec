const Router = require('express');
const router = new Router();

const taskController = require('../controllers/taskController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getOne);

module.exports = router;