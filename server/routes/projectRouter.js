const Router = require('express');
const router = new Router();

const projectController = require('../controllers/projectController')
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/', checkRole('ADMIN'), projectController.create);
router.post('/userProjects', projectController.getAll);
router.get('/:id', projectController.getOne);


module.exports = router;