const Router = require('express');
const router = new Router();

const executorRoleController = require('../controllers/executorRoleController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), executorRoleController.create );
router.get('/', executorRoleController.getAll )

module.exports = router;