const { Router } = require('express');
const videogameRouter = Router();
const { Videogame, Genre } = require('../db')
// ---- For API request  ------
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
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
// --> GET -->  videogame/
videogameRouter.get("/", (req, res) => res.send("Videogame router"))


//---------------------------------------------------------------------------------
// ********************* Falta hacer validaciones *********************************
//---------------------------------------------------------------------------------


// --> GET -->  videogame/:id
videogameRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    if (id.length < 7) {
        const gameInfoFromApi = await getApiData(id);
        if (gameInfoFromApi.name) {
            const { name, background_image, genres, description, released, rating, platforms } = gameInfoFromApi
            const gameDetail = {
                name,
                background_image,
                released,
                description,
                rating,
                platforms: platforms.map(el => el.platform.name),
                genres: genres.map(genre => genre.name)
            }
            res.status(200).json(gameDetail)
        }
    }
    if (id.length >= 8) {
        const gamesFromDb = await Videogame.findAll()
        const game = gamesFromDb.find(game => game.id == id)
        if (game.length) res.status(200).json(game)
    }
    else {
        res.status(404).json("Game Not Found")
    }
})

// --> POST -->  videogame/
videogameRouter.post("/", async (req, res) => {
    //     // ---> Get data from request.body
    let {
        name,
        description,
        released,
        rating,
        genres,
        platforms,
        createdInDb
    } = req.body;
    platforms = platforms.join(', ')

    try {
        //     // ---> Create game using Videogame model
        const gameCreated = await Videogame.create({ //devuelvo un array (OJOOO!!!!)
            name,
            description,
            released,
            rating,
            platforms,
            createdInDb
        })

        // --> Search all genres and add to created game
        const genresDb = await Genre.findAll({
            where: { name: genres }
        })
        gameCreated.addGenre(genresDb)
        // --> Response from POST Request
        // res.status(200).json(gameCreated)
        res.status(200).json(gameCreated)
    }
    // --> Handle error 
    catch (error) {
        console.log(error)
    }
})

module.exports = videogameRouter;
