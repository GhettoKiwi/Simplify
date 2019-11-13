const Account = require('../Model/Account');

exports.createUser = function (username, password, position, rights) {
    const account = new Account({
        username: username,
        rights: rights,
        position: position,
        password: password
    });
    return account.save();
};

exports.getUser = function (userId) {
    return Account.findOne({_id: userId}).exec();
};

exports.getUsers = function () {
    return Account.find().populate().exec();
};

exports.deleteUser = async function (accountId) {
  const account = await Account.findOne({_id: accountId}).exec();
  return await Account.deleteOne(account);
};

