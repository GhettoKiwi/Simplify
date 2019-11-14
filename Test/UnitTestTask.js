"use strict";
const should = require('should');
const request = require('supertest');
const mocha = require('mocha');
const Task = require("../Model/Task");
const app = require('../app');

mocha.setup;

describe('integrationsTest', () => {
    it("Test af: Standardobjekt med deadline i det ene godkendte format", async () => {
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
        response.body.name.should.be.equal('Vindues Polering');
        response.body.description.should.be.equal('Beskidte vinduer hele blokken');
        response.body.deadline.should.be.equal('2020-12-17T03:24:00');
        let id = response.body.id;
    })
    it("Test af: Standardobjekt med deadline i det andet godkendte format", async () => {
        let response = await request(app)
            .post('/tasks/')
            .send({
                name: "Utætte rør",
                description: "Lækage fra rør i underetagen st tv",
                deadline: "December 17, 2020 03:24:00'00"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.name.should.be.equal('Utætte rør');
        response.body.description.should.be.equal('Lækage fra rør i underetagen st tv');
        response.body.deadline.should.be.equal("December 17, 2020 03:24:00'00");
    })
    it("Test af: Objekt uden deadline", async () => {
        let response = await request(app)
            .post('/tasks/')
            .send({
                name: "Revner i væggen i opgangen",
                description: "Se på og vurder skader",
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.name.should.be.equal('Revner i væggen i opgangen');
        response.body.description.should.be.equal('Se på og vurder skader');
        response.body.deadline.should.be.equal("");
    })
    it("Test af: Objekt med deadline i forkert format", async () => {
        let response = await request(app)
            .post('/tasks/')
            .send({
                name: "Flækket Toilet",
                description: "Udskift toilettet i stuen th",
                deadline: "15 - 09 - 20 - 15 - 00"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.name.should.be.equal('Flækket Toilet');
        response.body.description.should.be.equal('Udskift toilettet i stuen th');
        response.body.deadline.should.be.equal(null);
    });
    it("Test af: Update task", async () => {
        let response = await request(app)
            .post('/tasks/')
            .send({
                name: "Vindues Polering",
                description: "Beskidte vinduer hele blokken",
                deadline: "2020-12-17T03:24:00"
            })
            /* test af update
            */
    })
})