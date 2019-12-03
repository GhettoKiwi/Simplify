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
    return Account.findOneAndDelete({_id: accountId});
};

// ---------- Task ----------

exports.createTask = function (name, description, deadline) {
    const task = new Task({
        name: name,
        description: description,
        deadline: deadline
    });
    task.save();
    return task.id;
};

// function(err, task) {task.id}

exports.getTask = function (taskId) {
    return Task.findOne({ _id: taskId }).exec();
};

/* Finds the task matching the TaskID and then updates the data */
exports.updateTask = async function (taskId, name, description, deadline, status, responsible, ETA, Comments) {
    let task = {
        name: name,
        description: description,
        deadline: deadline,
        status: status,
        responsible: responsible,
        ETA: ETA,
        Comments: Comments
    }
    return Task.findByIdAndUpdate(taskId, task, {new: true});
};

async function getTask(taskId) {
    return Task.findOne({ _id: taskId }).exec();
}

/* Finds a task from the taskID and then adds the comment to the array */
exports.addCommentToTask = async function(taskId, comment) {
    let task = await getTask(taskId);
    task.Comments.push(comment); 
    return task.save(); 
}

/* Removes the task with the specified ID */
exports.deleteTask = async function (taskId) {
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

/* Returns the department with the specified ID */
exports.getDepartment = function (depId) {
    return Department.findOne({ _id: depId }).exec();
};

/* Returns the departments */
exports.getDepartments = function () {
    return Department.find().populate().exec();
};

/* Returns the department with the specified ID
- This method is to be used within the controller */
async function getDepartment(depId) {
    return Department.findOne({ _id: depId }).exec();
}

/* Adds the task to the department with the specified IDs */
exports.addTaskToDepartment = async function(depId, taskId) {
    let department = await getDepartment(depId);
    department.tasks.push(taskId); 
    return department.save(); 
}

/* Removes the taskID from the department with the specified ID */
exports.removeTaskFromDepartment = async function(depId, taskId) {
    let department = await getDepartment(depId);
    for (let i = 0; i < department.tasks.length; i++) {
        if (department.tasks[i] === taskId) {
            department.tasks.splice(i, 1);
        } 
    }
    return department.save(); 
}