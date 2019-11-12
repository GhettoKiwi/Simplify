const should = require('should');
const {GET} = require("../app14.1medTest");

describe('asyncTest', () => {
    it('GET(userUrl)', async () => {
        let usersUrl = 'https://jsonplaceholder.typicode.com/users';
        let users = await GET(usersUrl);
        users.length.should.be.equal(10);
        users[0].name.should.be.equal('Leanne Graham');
    });
});
