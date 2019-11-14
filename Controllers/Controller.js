const Account = require('../Model/Account');
const Task = require('../Model/Task');

// ---------- Account ----------
exports.createUser = function (username, password, position, rights) {
    const account = new Account({
        username: username,
        rights: rights,
        position: position,
        password: password
    });
    return account.save();
};

exports.getUser = function (userId) {
    return Account.findOne({ _id: userId }).exec();
};

exports.getUsers = function () {
    return Account.find().populate().exec();
};

exports.deleteUser = async function (accountId) {
    const account = await Account.findOne({ _id: accountId }).exec();
    return await Account.deleteOne(account);
};

// ---------- Task ----------

exports.createTask = function (name, description, deadline) {
    const task = new Task({
        name: name,
        description: description,
        deadline: deadline
    });
    return task.save(function(err, task) {task.id});
};

exports.getTask = function (taskId) {
    return Task.find({ _id: taskId }).exec();
};

function getTask(taskId) {
    return Task.find({_id: taskId}).exec();
}

exports.updateTask = async function (taskId, name, description, deadline, status) {
    let task = {
        name: name,
        description: description,
        deadline: deadline,
        status: status 
    }
    return findByIdAndUpdate(taskId, task, {new: true});
};

exports.deleteTask = async function (taskId) {
    let task = await getTask(taskId);
    return Task.deleteOne(task);
};

exports.getTasks = function () {
    return Task.find().populate().exec();
};

// ---------- Department ----------

exports.createDepartment = function (name, tasks) {
    const department = new department({
        name: name,
        tasks: tasks
    });
    return department.save();
};

exports.getDepartment = function (departmentId) {
    return Department.findOne({ _id: departmentId }).exec;
};

exports.getDepartments = function () {
    return Department.find().populate().exec();
};

