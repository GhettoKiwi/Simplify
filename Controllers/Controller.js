"use strict";
 
const User = require('../Model/User');
const Task = require('../Model/Task');

// ---------- User ----------
exports.createUser = function (username, rights, position, password) {
    const user = new User({
        username: username,
        rights: rights,
        position: position,
        password: password
    });
    return user.save();
};

exports.getUser = function (userId) {
    return User.findOne({_id: userId}).exec;
};

exports.getUsers = function () {
    return User.find().populate().exec();
}

// ---------- Task ----------

exports.createTask = function (name, description, deadline) {
    const task = new Task({
        name: name,
        description: description,
        deadline: deadline,
        status: "OPEN"
    });
    return task.save();
};

exports.getTask = function (taskName) {
    return Task.findOne({name: taskName}).exec;
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
    return Department.findOne({_id: departmentId}).exec;
};

exports.getDepartments = function () {
    return Department.find().populate().exec();
}