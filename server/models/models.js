const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const { Sequelize } = require('../db');

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, unique: false},
    fullName: {type: DataTypes.STRING, unique: false},
	hashtag: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, unique: false, defaultValue: 'USER'},
});

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: false, allowNull: false},
});

const ProjectExecutor = sequelize.define('project_executor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const ProjectStatus = sequelize.define('project_status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
	color: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const ProjectRole = sequelize.define('project_role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Task = sequelize.define('task', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: false, allowNull: false},
        description: {type: DataTypes.TEXT, unique: false, allowNull: true},
        startDate: {type: DataTypes.DATE, unique: false, allowNull: false, defaultValue: Sequelize.NOW},
        dateCompletion: {type: DataTypes.DATE, unique: false, allowNull: false, defaultValue: Sequelize.NOW},
    }
);

const TaskExecutor = sequelize.define('task_executor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const ExecutorRole = sequelize.define('executor_role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const TaskStatus = sequelize.define('task_status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
	color: {type: DataTypes.STRING, unique: true, allowNull: false},
});

// users
User.hasMany(Project, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Project.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

User.hasMany(ProjectExecutor, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
ProjectExecutor.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

//project_status
ProjectStatus.hasMany(Project, {
    foreignKey: {
        name: 'statusId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Project.belongsTo(ProjectStatus, {
    foreignKey: {
        name: 'statusId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

//projects
Project.hasMany(ProjectExecutor, {
    foreignKey: {
        name: 'projectId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
ProjectExecutor.belongsTo(Project, {
    foreignKey: {
        name: 'projectId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

ProjectRole.hasMany(ProjectExecutor, {
    foreignKey: {
        name: 'roleId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
ProjectExecutor.belongsTo(ProjectRole, {
    foreignKey: {
        name: 'roleId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

Project.hasMany(Task, {
    foreignKey: {
        name: 'projectId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Task.belongsTo(Project, {
    foreignKey: {
        name: 'projectId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

//tasks
Task.hasMany(TaskExecutor, {
    foreignKey: {
        name: 'taskId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
TaskExecutor.belongsTo(Task, {
    foreignKey: {
        name: 'taskId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

TaskStatus.hasMany(Task, {
    foreignKey: {
        name: 'statusId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Task.belongsTo(TaskStatus, {
    foreignKey: {
        name: 'statusId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

//task_executors
ExecutorRole.hasMany(TaskExecutor, {
    foreignKey: {
        name: 'roleId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
TaskExecutor.belongsTo(ExecutorRole, {
    foreignKey: {
        name: 'roleId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

User.hasMany(TaskExecutor, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
TaskExecutor.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Project,
    ProjectExecutor,
    ProjectRole,
    ExecutorRole,
    ProjectStatus,
    Task,
    TaskExecutor,
    TaskStatus,
}