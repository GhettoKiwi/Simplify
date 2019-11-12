 const Account = require('../Model/User');

exports.createUser = function (username, password, position, rights) {
    const account = new Account({
        username: username,
        rights: rights,
        position: position,
        password: password
    });
    console.log("TRYKKET 3");
    return account.save();
};

exports.getUser = function (userId) {
    return Account.findOne({_id: userId}).exec;
};

exports.getUsers = function () {
    return Account.find().populate().exec();
}