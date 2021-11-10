/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Genre, conn } = require('../../src/db.js');

const agent = session(app);

describe('Genre routes', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
});


describe('GET /genres', () => {

    it('should respond with a 200 status code', async () => {
        const response = await agent.get('/genres');
        expect(response.status).to.equal(200);
    });
    it('should return all genres', (done) => {
        agent.get('/genres')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).to.be.an('array');
            })
            .end(done);
    });

    it('should return a 404 status code if the genre does not exist', (done) => {
        agent.get('/genres/0')
            .expect(404)
            .end(done);
    });
});
