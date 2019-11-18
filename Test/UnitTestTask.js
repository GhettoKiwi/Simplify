"use strict";
const should = require('should');
const request = require('supertest');
const mocha = require('mocha');
const Task = require("../Model/Task");
const app = require('../app');

let id = "";

describe('First post', () => {
    it("Test af: Post af Standardobjekt", async () => {
        let response = await request(app)
            .post('/tasks/')
            .send({
                name: "TEST MIG",
                description: "Beskidte vinduer hele blokken",
                deadline: "2020-12-17T03:24:00"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.name.should.be.equal('TEST MIG');
        response.body.description.should.be.equal('Beskidte vinduer hele blokken');
        response.body.deadline.should.be.equal('2020-12-17T03:24:00');
    })

    it("Test af: Get af oprettet standardobjekt", async () => {
        let response = await request(app)
            .get('/tasks/')
            .expect(200)
            .expect('Content-Type', /json/)
        let test = response.body
        for (let t of test) {
            if (t.name === "TEST MIG") {
                id = t._id;
            }
        }
    })
    it("Test af: Put af eksisterende objekt (Update)", async () => {
        let response = await request(app)
            .put('/tasks/' + id)
            .send({
                name: "Beskidte vinduer i hele afdelingen",
                description: "Den er helt gal, man kan næsten ikke se ud",
                deadline: "2020-12-11T12:00:00",
                status: "IN PROGRESS"
            })
            .expect(200)
            .expect('Content-Type', /json/)
        response.body.name.should.be.equal('Beskidte vinduer i hele afdelingen');
        response.body.description.should.be.equal('Den er helt gal, man kan næsten ikke se ud');
        response.body.deadline.should.be.equal('2020-12-11T12:00:00');
        response.body.status.should.be.equal("IN PROGRESS");
    })
    it("Test af: Delete af eksisterende objekt", async () => {
        let response = await request(app)
            .delete('/tasks/' + id)
    })
    it("Test af: Om det slettede objekt er væk fra databasen", async () => {
        let response = await request(app)
            .get('/tasks/' + id)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => console.log(response.body))
    })
});