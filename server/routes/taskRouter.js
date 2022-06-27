const Router = require('express');
const router = new Router();

const taskController = require('../controllers/taskController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), taskController.create);
// router.post('/destroy', checkRole('ADMIN'), taskController.destroy);
// router.post('/update', checkRole('ADMIN'), taskController.update);
router.post('/projectTasks', taskController.getAll);
router.get('/:id', taskController.getOne);

module.exports = router;