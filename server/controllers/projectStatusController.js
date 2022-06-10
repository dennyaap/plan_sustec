const { ProjectStatus, Project } = require('../models/models');

class ProjectStatusController {
    async create(req, res){
        const { name, color } = req.body;
        const status = await ProjectStatus.create({ name, color });
        return res.json(status);
    }
	async update(req, res){
		const { projectId, statusId } = req.body;
		const project = await Project.update({ statusId }, {
			where: {
				id: projectId
			}
		});
		return res.json(project);
	}
    async getAll(req, res){
        const statuses = await ProjectStatus.findAll();
        return res.json(statuses);
    }
}

module.exports = new ProjectStatusController();