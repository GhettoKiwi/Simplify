 const User = require('../Model/User');

exports.createUser = function (name, rights, position, password) {
    const user = new User({
        name: name,
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