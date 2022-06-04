const { ExecutorRole } = require('../models/models');

class ExecutorRoleController {
    async create(req, res) {
        const { name } = req.body;
        const role = await ExecutorRole.create({ name });
        
        return res.json(role);
    }
    async getAll(req, res) {
        const roles = await ExecutorRole.findAll();
        return res.json(roles);
    }
}

module.exports = new ExecutorRoleController()