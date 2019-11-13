const Controller = require('../Controllers/Controller');
const assert = require('assert');

Controller.createUser('DDM',1,'vicevært','passworder123');
let alle = Controller.getUser();
let findnavn = {name :"DDM"};
let person1 = alle.findOne(findnavn);
let person2 = alle._findOne(findnavn);

assert.equal(person1.name , 'DDM');
assert.equal(person1.rights , 1 );
assert.equal(person1.position , 'vicevært' );
assert.equal(person1.password , 'passworder123');

//Controller.deletmetode(id??)
assert.equal(person1, undefined);
assert.equal(person1, null);





