const Controller = require('../Controllers/Controller');
const Router = require('../Storage/CloudHandling');
const assert = require('assert');
let mocha = require('mocha');
let describe = mocha.describe;

function findId(array, name){
    let getName = {name : name};
    let toReturn ;
    for(let i =0;i<array.length;i++){
        if(array[i].name === name){
            let toReturn = array[i]._id;
        }
    }
    return toReturn
}

let all = Router.fetch('/accounts');
console.log(all);
let allUsers = JSON.parse(all);
console.log(allUsers);
let userID = findId(all, 'DDM');
let person1 = Controller.getUser(userID);
console.log(person1);

Controller.createUser('DDM', 1, 'vicevært', 'passworder123');
// opret bruger metoden
describe('opret bruger', function() {

    it('person name skal være DDM', function() {
        assert.equal(person1.name, 'DDM');
    });
    it('person rights skal være 1', function() {
        assert.equal(person1.rights, 1);
    });
    it('person position skal være vicevært', function() {
        assert.equal(person1.position, 'vicevært');
    });
    it('person password skal være passworder123', function() {
        assert.equal(person1.name, 'DDM');
    });

});
// delete metoden
describe('opret bruger', function() {
    //Controller.deletmetode(id??)
    assert.equal(person1, undefined);
    assert.equal(person1, null);
});





