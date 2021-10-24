const { Router } = require('express');
const genres = Router();

genres.get('/', function (req, res) {
    res.send('Genres');
});


module.exports = genres;
