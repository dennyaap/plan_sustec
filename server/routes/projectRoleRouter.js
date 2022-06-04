const Router = require('express');
const router = new Router();

const projectRoleController = require('../controllers/projectRoleController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), projectRoleController.create );
router.get('/', projectRoleController.getAll )

module.exports = router;