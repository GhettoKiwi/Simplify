const Controller = require('../Controller/Controller');
const assert = require('assert');

Controller.createUser('DDM',1,'vicevært','passworder123');
let alle = Controller.getUser();
let person1 = alle.find
assert.equal(person1.name , 'DDM');
assert.equal(person1.rights , 1 );
assert.equal(person1.position , 'vicevært' );
assert.equal(person1.password , 'passworder123');


