const should = require('should');
const {genererUserTabel} = require("../app14.1medTest");
const mocha = require('mocha');
mocha.setup;

describe('unitTest', () => {
    it('genererUserTabel unden users', () => {
        genererUserTabel([/* tom */]).should.be.equal('<table></table>');
    });

    it('genererUserTabel med én user', () => {
        let enUser = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": {
                    "street": "Kulas Light",
                    "suite": "Apt. 556",
                    "city": "Gwenborough",
                    "zipcode": "92998-3874",
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                },
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": {
                    "name": "Romaguera-Crona",
                    "catchPhrase": "Multi-layered client-server neural-net",
                    "bs": "harness real-time e-markets"
                }
            }
        ];
        let enUserTabel =
            `<table> <tr><td>1</td><td>Leanne Graham</td><td>Romaguera-Crona</td></tr>\n</table>`;
        genererUserTabel(enUser).should.be.equal(enUserTabel);
    });
});
