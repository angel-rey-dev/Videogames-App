const { Genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe("Find All Genres in Database", () => {
    it("should return all genres in the database",
        async () => {
            const genres = await Genre.findAll();
            expect(genres).to.have.lengthOf(19);
        }
    );

    it("is an array",
        async () => {
            const genres = await Genre.findAll();
            expect(genres).to.be.an('array');
        }
    );

});