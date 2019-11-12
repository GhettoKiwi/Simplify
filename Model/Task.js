let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Task = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: false
    },
    status: {
        type: Status,
        required: true
    }
});

Task.methods.toString = function () {
    return this.name + " | " + this.status;
}

module.exports = mongoose.model('Task', Task);