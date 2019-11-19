"use strict";
const should = require('should');
const request = require('supertest');
const mocha = require('mocha');
const Task = require("../Model/Account");
const app = require('../app');

let id = "5dd265f950b32142cc694fe9";

describe('opret bruger', function() {
    it("Test af: Post af opret af bruger", async () => {
        let response = await request(app)
            .post('/accounts/')
            .send({
                username: "testperson",
                password: "testpassword",
                rights: 2 ,
                position: "vicevært",
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.username.should.be.equal('testperson');
        response.body.password.should.be.equal('testpassword');
        response.body.rights.should.be.equal(2);
        response.body.position.should.be.equal("vicevært");
    })
    it("Test af delete af account", async () => {
        let response = await request(app)
            .delete('/accounts/' + id)
    })    });