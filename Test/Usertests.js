const Controller = require('../Controller/Controller');
const expect = require('expect')

let person1 =  Controller.createUser('DDM','1','vicevært','passworder123');
expect(person1.password).toBe('passworder123');
expect(person1.name).toBe('DDM');
expect(person1.rights).toBe('1');
expect(person1.position).toBe('vicevært');


