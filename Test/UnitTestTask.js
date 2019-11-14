"use strict";
const should = require('should');
const request = require('supertest');
const mocha = require('mocha');
const Task = require("../Model/Task");
const app = require('../app');

mocha.setup;

describe('unitTest', () => {
    it("post(/postTask)", async () => {
        // let task1 = new Task({
        //     name: "Vindues Polering",
        //     description: "Beskidte vinduer hele blokken",
        //     deadline: "1995-12-17T03:24:00"
        // });
        let response = await request(app)
            .post('/tasks/')
            .send( {
                name: "Vindues Polering",
                description: "Beskidte vinduer hele blokken",
                deadline: "1995-12-17T03:24:00"
            })
            .set('Accept', 'application/json')
            .expect(200)
            // .expect(response => { console.log(response) })
            .expect('Content-Type', /json/);
        // response.description.should.be.equal('Beskidte vinduer hele blokken');
        //     task1[0].deadline.should.be.equal('1995-12-17T03:24:00');
        // response.body.tal.should.be.equal(123);
    })
    // it("StandardObjekt med deadline i format 1", () => {
    //     let task1 = [{
    //         "name": "Vindues Polering",
    //         "description": "Beskidte vinduer hele blokken",
    //         "deadline": "1995-12-17T03:24:00"
    //     }];
    //     task1[0].name.should.be.equal('Vindues Polering');
    //     task1[0].description.should.be.equal('Beskidte vinduer hele blokken');
    //     task1[0].deadline.should.be.equal('1995-12-17T03:24:00');
    //     // task1[0].status.should.be.equal('OPEN');
    // });
    // it("StandardObjekt med deadline i format 2", () => {
    //     let task2 = [{
    //         "name": "Utætte rør",
    //         "description": "Utætte rør i underetagen st tv",
    //         "deadline": "December 17, 1995 03:24:00'00"
    //     }]
    // })
    // it("Objekt uden deadline", () => {
    //     let task3 = [{
    //         "name": "Revner i væggen i opgangen",
    //         "description": "Se på og vurder skader",
    //         "deadline": null
    //     }]
    // })
    // it("Objekt med deadline i forkert format", () => {
    //     let task4 = [{
    //         "name": "Flækket toilet",
    //         "description": "Udskift toilettet i stuen th",
    //         "deadline": "15 - 09 - 20 - 15 - 00"
    //     }]
    // });

})