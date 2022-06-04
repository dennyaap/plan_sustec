const { ProjectRole } = require('../models/models');

class ProjectRoleController {
    async create(req, res) {
        const { name } = req.body;
        const role = await ProjectRole.create({ name });
        
        return res.json(role);
    }
    async getAll(req, res) {
        const roles = await ProjectRole.findAll();
        return res.json(roles);
    }
}

module.exports = new ProjectRoleController()