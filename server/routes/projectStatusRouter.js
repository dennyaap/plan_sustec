const Router = require('express');
const router = new Router();

const projectStatusController = require('../controllers/projectStatusController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), projectStatusController.create);
router.post('/change', projectStatusController.update)
router.get('/', projectStatusController.getAll);

module.exports = router;