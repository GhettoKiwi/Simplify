const Controller = require('../Controllers/Controller');
const assert = require('assert'); 

// Standardobjekt der skal virke med deadline i format type 1
let task1 = Controller.createTask('Vindues Polering', 'Beskidte vinduer hele blokken', '1995-12-17T03:24:00');

// Standardobjekt der skal virke med deadline i format type 2
let task2 = Controller.createTask('Utætte rør', 'Utætte rør i underetagen st tv', 'December 17, 1995 03:24:00');

// Objekt uden deadline
let task3 = Controller.createTask('Revner i væggen i opgangen', 'Se på og vurder skader');

// Objekt med deadline i forkert format
let task4 = Controller.createTask('Flækket toilet', 'Udskift toilettet i stuen th', 15-09-20-15-00);

// Getting all the Tasks from the database
let allTasks = Controller.getTasks();

// Testing task 1
let testTask1 = Controller.getTask('Vindues Polering');
assert.equal(testTask1.name , 'Vindues Polering');
assert.equal(testTask1.description , 'beskidte vinduer');
assert.equal(testTask1.deadline , '1995-12-17T03:24:00');
assert.equal(testTask1.status, 'OPEN');

// Testing task 2
let testTask2 = Controller.getTask('Utætte rør');
assert.equal(testTask2.name , 'Utætte rør');
assert.equal(testTask2.description , 'Utætte rør i underetagen st tv');
assert.equal(testTask2.deadline , 'December 17, 1995 03:24:00');
assert.equal(testTask2.status, 'OPEN');

// Testing task 3
let testTask3 = Controller.getTask('Revner i væggen i opgangen');
assert.equal(testTask3.name , 'Revner i væggen i opgangen');
assert.equal(testTask3.description , 'Se på og vurder skader');
assert.equal(testTask3.deadline , null);
assert.equal(testTask3.status, 'OPEN');

// Testing task 4
let testTask4 = Controller.getTask('Flækket toilet');
assert.equal(testTask4.name , 'Flækket toilet');
assert.equal(testTask4.description , 'Udskift toilettet i stuen th');
assert.notEqual(testTask4.deadline , 15-09-20-15-00);
assert.equal(testTask4.status, 'OPEN');
