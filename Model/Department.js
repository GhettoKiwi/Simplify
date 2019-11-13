let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Department = new Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: Task,
        required: false
    }]
});

Department.methods.toString = function () {
    return this.location + " | " + this.tasks;
}

module.exports = mongoose.model('Department', Department);