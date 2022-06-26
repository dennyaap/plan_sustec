const {Project, ProjectExecutor, User} = require('../models/models');;
const ApiError = require('../error/ApiError');
const sequelize = require('sequelize');

const Op = sequelize.Op;

class ProjectController {
    async create(req, res, next){
        try {
            let { name, userId, statusId, projectExecutors, searchValue } = req.body;
            // const {img} = req.files;
            // let fileName = uuid.v4() + ".jpg";
            // img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const project = await Project.create({ name, userId, statusId });

            if(projectExecutors) {
                const executors = JSON.parse(projectExecutors);
                executors.forEach(executor => {
                    ProjectExecutor.create({
                        userId: executor.userId,
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
        let {userId, statusId, limit, page, searchValue} = req.body;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let projects;

		const filterUndefinedValues = (obj) =>
			Object.fromEntries(
				Object.entries(obj).filter(([, value]) => value !== undefined)
			);

		let where = filterUndefinedValues({userId, statusId});
		where.name = {
			[Op.like]: '%' + searchValue + '%'
		}
		
        projects = await Project.findAndCountAll({
			where,
			limit, 
			offset, 
			include: [
				{ 
					model: ProjectExecutor,
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
	async destroy(req, res){
		const { projectId } = req.body;
		const project = await Project.destroy({
			where: {
				id: projectId
			}
		});
		return res.json( project );
	}
	async update(req, res){
		const { projectId, projectName, executors, deletedExecutors, executorRoles } = req.body;
		let project = {};
		if(projectName){
			project = await Project.update(
				{
					name: projectName
				},
				{
					where: {
						id: projectId
					}
				});
		} 
		if (executors) {
			executors.forEach( (executor) => {
				ProjectExecutor.create({
					userId: executor.userId,
					projectId,
					roleId: executor.roleId
				})
			})
		}
		if(deletedExecutors) {
			deletedExecutors.forEach( (userId) => {
				ProjectExecutor.destroy({
					where: {
						userId,
						projectId
					}
				})
			})
		}
		if(executorRoles) {
			executorRoles.forEach( (executor) => {
				ProjectExecutor.update(
					{
						roleId: executor.roleId
					},
					{
						where: {
							projectId,
							userId: executor.userId
						}
					}
				)
			})
		}
		return res.json( project );
	}
}

module.exports = new ProjectController();