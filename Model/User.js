const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username : String,
    rights: Number ,
    position: String
});

User.methods.toString = function () {
    return this.username + ", " + this.position;
};

module.exports = mongoose.model('User', User);