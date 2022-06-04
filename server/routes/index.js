const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const projectStatusRouter = require('./projectStatusRouter');
const projectRouter = require('./projectRouter');
const projectRoleRouter = require('./projectRoleRouter');
const taskStatusRouter = require('./taskStatusRouter');
const taskRouter = require('./taskRouter');
const executorRole = require('./executorRoleRouter');


//сопостоавляем маршруты с соотв. роутером
router.use('/user', userRouter);
router.use('/projectStatus', projectStatusRouter);
router.use('/project', projectRouter);
router.use('/projectRole', projectRoleRouter);
router.use('/taskStatus', taskStatusRouter);
router.use('/task', taskRouter);
router.use('/executorRole', executorRole);

module.exports = router;