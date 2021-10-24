const { Router } = require('express');
const videogameRouter = Router();

videogameRouter.get('/', function (req, res) {
    res.send('Videogame');
});


module.exports = videogameRouter;
