const { Router } = require('express');
const videogameRouter = Router();
const { Videogame, Genre } = require('../db')

// ---- For API request  ------
const axios = require('axios');
require('dotenv').config();
const {
    API_KEY
} = process.env;
// ----------------------------

// Get data from API
const getApiData = async (gameId) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
        const gameData = await response.data
        return gameData
    } catch (error) {
        return error
    }
}

videogameRouter.get("/", (req, res) => res.send("Videogame router"))


videogameRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    if (id) {
        const gameInfoFromApi = await getApiData(id);
        res.status(200).json(gameInfoFromApi)
    } else {
        res.status(404).json("Game Not Found")
    }
})

videogameRouter.post("/", async (req, res) => {
    const {
        name,
        description,
        released,
        rating,
        platforms,
        genres,
    } = req.body

    const gameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        createdInDb
    })

    const genresDb = await Genre.findAll({
        where: { name: genres }
    })

    gameCreated.addGenre(genresDb)

    res.send("Personaje creado con exito")
})

module.exports = videogameRouter;
