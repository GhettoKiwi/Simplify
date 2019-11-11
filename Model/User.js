const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name : String,
    rights: Number ,
    position: String
});

User.methods.toString = function () {
    return this.name + ", " + this.position;
};

module.exports = mongoose.model('User', User);