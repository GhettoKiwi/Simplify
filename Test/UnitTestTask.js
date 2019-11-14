"use strict";
const should = require('should');
const request = require('supertest');
const mocha = require('mocha');
const Task = require("../Model/Task");
const app = require('../app');

let id = "5dcd7d68cec1ab1d2044bc7f";

describe('First post', () => {
    it("Test af: Post af Standardobjekt", async () => {
        let response = await request(app)
            .post('/tasks/')
            .send({
                name: "Vindues Polering",
                description: "Beskidte vinduer hele blokken",
                deadline: "2020-12-17T03:24:00"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        console.log("THIS IS THE RESPONSE!!!!!!: " + response);
        response.body.name.should.be.equal('Vindues Polering');
        response.body.description.should.be.equal('Beskidte vinduer hele blokken');
        response.body.deadline.should.be.equal('2020-12-17T03:24:00');
    })
    it("Test af: Get af oprettet standardobjekt", async () => {
        let response = await request(app)
            .get('/tasks/'+id)
            .expect(200)
            .expect(response => (console.log(response.body)))
            .expect('Content-Type', /json/)
    })
    // it("Test af: Update task", async () => {
    //     let response = await request(app)
    //         .post('/tasks/')
    //         .send({
    //             name: "Vindues Polering",
    //             description: "Beskidte vinduer hele blokken",
    //             deadline: "2020-12-17T03:24:00"
    //         })
    //     /* 
    //     test af update
    //     */
    // })
});


    // it("Test af: Objekt uden deadline", async () => {
    //     let response = await request(app)
    //         .post('/tasks/')
    //         .send({
    //             name: "Revner i væggen i opgangen",
    //             description: "Se på og vurder skader",
    //         })
    //         .set('Accept', 'application/json')
    //         .expect(200)
    //         .expect('Content-Type', /json/);
    // })
    // it("Test af: Objekt med deadline i forkert format", async () => {
    //     let response = await request(app)
    //         .post('/tasks/')
    //         .send({
    //             name: "Flækket Toilet",
    //             description: "Udskift toilettet i stuen th",
    //             deadline: "15 - 09 - 20 - 15 - 00"
    //         })
    //         .set('Accept', 'application/json')
    //         .expect(200)
    //         .expect('Content-Type', /json/);
    //     response.body.name.should.be.equal('Flækket Toilet');
    //     response.body.description.should.be.equal('Udskift toilettet i stuen th');
    //     response.body.deadline.should.be.equal(null);
    // });

