const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String,
    rights: Number ,
    position: String
});

Account.methods.toString = function () {
    return this.username + ", " + this.position;
};

module.exports = mongoose.model('Account', Account);