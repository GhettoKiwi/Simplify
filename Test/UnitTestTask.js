"use strict";
const should = require('should');

const mocha = require('mocha');
const { Task } = require("../Model/Task");
let Controller = require("../Controllers/Controller");

mocha.setup;

describe('unitTest', () => {
    it("StandardObjekt med deadline i format 1", () => {
        let task1 = [{
            "name": "Vindues Polering",
            "description": "Beskidte vinduer hele blokken",
            "deadline": "1995-12-17T03:24:00"
        }];
        task1[0].name.should.be.equal('Vindues Polering')
    });
    it("StandardObjekt med deadline i format 2", () => {
        let task2 = [{
            "name": "Utætte rør",
            "description": "Utætte rør i underetagen st tv",
            "deadline": "December 17, 1995 03:24:00'00"
        }]
    })
    it("Objekt uden deadline", () => {
        let task3 = [{
            "name": "Revner i væggen i opgangen",
            "description": "Se på og vurder skader",
            "deadline": null
        }]
    })
    it("Objekt med deadline i forkert format", () => {
        let task4 = [{
            "name": "Flækket toilet",
            "description": "Udskift toilettet i stuen th",
            "deadline": "15 - 09 - 20 - 15 - 00"
        }]
    });

})

// describe('unitTest', () => {
//     it('genererUserTabel unden users', () => {
//         genererUserTabel([/* tom */]).should.be.equal('<table></table>');
//     });

//     it('genererUserTabel med én user', () => {
//         let enUser = [
//             {
//                 "id": 1,
//                 "name": "Leanne Graham",
//                 "username": "Bret",
//                 "email": "Sincere@april.biz",
//                 "address": {
//                     "street": "Kulas Light",
//                     "suite": "Apt. 556",
//                     "city": "Gwenborough",
//                     "zipcode": "92998-3874",
//                     "geo": {
//                         "lat": "-37.3159",
//                         "lng": "81.1496"
//                     }
//                 },
//                 "phone": "1-770-736-8031 x56442",
//                 "website": "hildegard.org",
//                 "company": {
//                     "name": "Romaguera-Crona",
//                     "catchPhrase": "Multi-layered client-server neural-net",
//                     "bs": "harness real-time e-markets"
//                 }
//             }
//         ];
//         let enUserTabel =
//             `<table> <tr><td>1</td><td>Leanne Graham</td><td>Romaguera-Crona</td></tr>\n</table>`;
//         genererUserTabel(enUser).should.be.equal(enUserTabel);
//         genererUserTabel(enUser).should.be.
//     });
// });