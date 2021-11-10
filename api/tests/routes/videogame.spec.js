// /* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Videogame, conn } = require('../../src/db.js');

// const agent = session(app);

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
// });

// describe('GET /videogames', () => {
//   it('should respond with a 200 status code', async () => {
//     const res = await agent.get('/videogames');
//     expect(res.status).to.equal(200);
//   });

//   it('should return an array', async () => {
//     const res = await agent.get('/videogames');
//     expect(res.body).to.be.an('array');
//   });

//   it("should return a videogame's id", async () => {
//     const res = await agent.get('/videogames');
//     expect(res.body[0]).to.have.property('id');
//   });

// });
