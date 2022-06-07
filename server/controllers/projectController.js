const {Project, ProjectExecutor} = require('../models/models');
// const uuid = require('uuid');
// const path = require('path');
const ApiError = require('../error/ApiError');

class ProjectController {
    async create(req, res, next){
        try {
            let { name, userId, statusId, projectExecutors } = req.body;
            // const {img} = req.files;
            // let fileName = uuid.v4() + ".jpg";
            // img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const project = await Project.create({ name, userId, statusId });


            if(projectExecutors) {
                executors = JSON.parse(projectExecutors); //данные через form data приходят в ввиде строки
                executors.forEach(executor => {
                    ProjectExecutor.create({
                        userId: executor.id,
                        projectId: project.id,
                        roleId: executor.roleId
                    })
                })
            }

            return res.json(project);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res){
        let {userId, statusId, limit, page} = req.body;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let projects;
        if(!userId && !statusId){
            projects = await Project.findAndCountAll({limit, offset});
        }
        if(userId && !statusId){
            projects = await Project.findAndCountAll({where: {userId}, limit, offset});
        }
        if(!userId && statusId){
            projects = await Project.findAndCountAll({where: {statusId}, limit, offset});
        }
        if(userId && statusId){
            projects = await Project.findAndCountAll({where: {userId, statusId}, limit, offset});
        }
        return res.json(projects);
    }
    async getOne(req, res){
        const {id} = req.params;
        const project = await Project.findOne(
            {
                where: { id },
                include: [{ model: ProjectExecutor }]
            }
        )
        return res.json( project )
    }
}

module.exports = new ProjectController();