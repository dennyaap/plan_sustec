const { ProjectStatus } = require('../models/models');

class ProjectStatusController {
    async create(req, res){
        const {name} = req.body;
        const status = await ProjectStatus.create({ name });
        return res.json(status);
    }
    async getAll(req, res){
        const statuses = await ProjectStatus.findAll();
        return res.json(statuses);
    }
}

module.exports = new ProjectStatusController();