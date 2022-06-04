const { TaskStatus } = require('../models/models');

class TaskStatusController {
    async create(req, res){
        const {name} = req.body;
        const status = await TaskStatus.create({ name });
        return res.json(status);
    }
    async getAll(req, res){
        const statuses = await TaskStatus.findAll();
        return res.json(statuses);
    }
}

module.exports = new TaskStatusController();