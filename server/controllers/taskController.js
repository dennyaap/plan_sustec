const {Task, TaskExecutor, User} = require('../models/models');
const ApiError = require('../error/ApiError');

const sequelize = require('sequelize');
const Op = sequelize.Op;

class TaskController {
    async create(req, res, next){
        try {
            let { name, description, startDate, dateCompletion, projectId, statusId, taskExecutors} = req.body;
            // const {img} = req.files;
            // let fileName = uuid.v4() + ".jpg";
            // img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const task = await Task.create({ name, description, startDate, dateCompletion, projectId, statusId });


            if(taskExecutors) {
                executors = JSON.parse(taskExecutors);
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
        let {projectId, statusId, limit, page, searchValue} = req.body;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let tasks;

		const filterUndefinedValues = (obj) =>
			Object.fromEntries(
				Object.entries(obj).filter(([, value]) => value !== undefined && value !== '')
			);

		let where = filterUndefinedValues({projectId, statusId});
		where.name = {
			[Op.like]: '%' + searchValue + '%'
		}
		
        tasks = await Task.findAndCountAll({
			where,
			limit, 
			offset, 
			include: [
				{ 
					model: TaskExecutor,
					include: [
						{
							model: User,
							attributes: ['fullName']
						}
					]
				}
			],
			order: [['createdAt', 'DESC']]
		}
		);
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