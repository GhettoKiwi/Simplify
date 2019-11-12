const should = require('should');
const request = require('supertest');
const {app} = require("../app14.1medTest");

describe('integrationsTest', () => {
    it("get('/')", async () => {
        let response = await request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/);
        response.text.search(/<table>/).should.be.equal(0);
    });

    it("get('/json')", async () => {
        let response = await request(app)
            .get('/json')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body[0].name.should.be.equal('Leanne Graham');
    });

    it("get('/xyz')", async () => {
        await request(app)
            .get('/xyz')
            .expect(404)
            .expect('Content-Type', /html/)
    });


    it("post('/')", async () => {
        let response = await request(app)
            .post('/')
            .send({tal: 123})
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.tal.should.be.equal(123);
    });
});
