const Account = require('../Model/Account');
const Task = require('../Model/Task');
const Department = require('../Model/Department');

// ---------- Account ----------
exports.createUser = function (username, password, position) {
    const account = new Account({
        username: username,
        position: position,
        password: password
    });
    return account.save();
};

exports.getUser = function (userId) {
    return Account.findOne({ _id: userId }).exec();
};

exports.getUser_ByUsernameAndPassword = function (username, password) {
    return Account.findOne({username: username, password: password}).exec();
};

exports.getUsers = function () {
    return Account.find().populate().exec();
};

exports.deleteUser = async function (accountId) {
    console.log(accountId);
    return Account.findOneAndDelete({_id: accountId});
};

// ---------- Task ----------

exports.createTask = function (name, description, deadline) {
    const task = new Task({
        name: name,
        description: description,
        deadline: deadline
    });
    return task.save();
};

// function(err, task) {task.id}

exports.getTask = function (taskId) {
    return Task.findOne({ _id: taskId }).exec();
};

exports.updateTask = async function (taskId, name, description, deadline, status, responsible, ETA) {
    let task = {
        name: name,
        description: description,
        deadline: deadline,
        status: status,
        responsible: responsible,
        ETA: ETA
    }
    return Task.findByIdAndUpdate(taskId, task, {new: true});
};

exports.deleteTask = async function (taskId) {
    console.log(taskId);
    return Task.findOneAndDelete({_id: taskId})
};

exports.getTasks = function () {
    return Task.find().populate().exec();
};

// ---------- Department ----------

exports.createDepartment = function (name, tasks) {
    const department = new Department({
        name: name,
        tasks: tasks
    });
    return department.save();
};

exports.getDepartment = function (depId) {
    return Department.findOne({ _id: depId }).exec();
};

exports.getDepartments = function () {
    return Department.find().populate().exec();
};

exports.updateDepartment = async function(name, taskid) {
    let department = await getDepartment(name);
    department.tasks.push(taskid); 
    return department.save(); 
}