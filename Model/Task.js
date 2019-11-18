let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Task = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['OPEN', 'IN PROGRESS', 'DONE', 'ON HOLD'],
        default: 'OPEN'
    },
    responsible: {
        type: String,
        default: ""
    },
    ETA: {
        type: Date,
        default: null
    }
});

Task.methods.toString = function () {
    return this.name + " | " + this.status;
}

module.exports = mongoose.model('Task', Task);