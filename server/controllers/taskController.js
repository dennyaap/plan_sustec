const {Task, TaskExecutor} = require('../models/models');
// const uuid = require('uuid');
// const path = require('path');
const ApiError = require('../error/ApiError');

class TaskController {
    async create(req, res, next){
        try {
            let { name, description, startDate, dateCompletion, projectId, statusId, taskExecutors} = req.body;
            // const {img} = req.files;
            // let fileName = uuid.v4() + ".jpg";
            // img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const task = await Task.create({ name, description, startDate, dateCompletion, projectId, statusId });


            if(taskExecutors) {
                executors = JSON.parse(taskExecutors); //данные через form data приходят в ввиде строки
                executors.forEach(executor => {
                    TaskExecutor.create({
                        userId: executor.id,
                        taskId: task.id,
                        roleId: executor.roleId,
                    });
                });
            }

            return res.json(task);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res){
        let {projectId, statusId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let tasks;
        if(!projectId && !statusId){
            tasks = await Task.findAndCountAll({limit, offset});
        }
        if(projectId && !statusId){
            tasks = await Task.findAndCountAll({where: {projectId}, limit, offset});
        }
        if(!projectId && statusId){
            tasks = await Task.findAndCountAll({where: {statusId}, limit, offset});
        }
        if(projectId && statusId){
            tasks = await Task.findAndCountAll({where: {projectId, statusId}, limit, offset});
        }
        return res.json(tasks);
    }
    async getOne(req, res){
        const {id} = req.params;
        const task = await Task.findOne(
            {
                where: { id },
                include: [{ model: TaskExecutor }]
            }
        )
        return res.json( task );
    }
}

module.exports = new TaskController();