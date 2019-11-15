"use strict";
const should = require('should');
const request = require('supertest');
const mocha = require('mocha');
const Account = require('../Model/Account');
const app = require('../app');

let id = "5dcad0c260e3a13c08b3e9ce";

describe('Test af delete', () => {
    it("Test af delete af account", async () => {
        let response = await request(app)
            .delete('/accounts/' + id)
    })
});