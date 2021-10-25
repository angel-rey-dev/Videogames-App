const { Router } = require('express');
const videogamesRouter = Router();

// ---- For API request  ------
const axios = require('axios');
require('dotenv').config();
const {
    API_KEY
} = process.env;
// ----------------------------

// Get data form API
const getApiData = async () => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        const data = await response.data.results.map(game => {
            const { name, background_image,genres } = game;
            return {
                name,
                background_image,
                genres: genres.map(el => el.name)
            }
        })
        return data
    } catch (error) {
        return error
    }
}
// Get data from DataBase
const getDbData = async () => {
    try {
        const dbInfo = await Videogame.findAll({
            incude: {
                model: Genre,
                attributes: ["name"],
                throught: {
                    attributes: [],
                }
            }
        })
        return dbInfo
    } catch (error) {
        return error
    }
}

// Concat API info and DataBase info
const getAllGames = async () => {
    try {
        const apiInfo = await getApiData()
        const dbInfo = await getDbData()
        return apiInfo.concat(dbInfo)
    } catch (error) {
        return error
    }
}

// --> GET -->  videogames/
videogamesRouter.get("/", async (req, res) => {
    const name = req.query.name
    const allGames = await getAllGames();

    if (name) {
        const filteredGames = await allGames.filter(game => {
            return game.name.toLowerCase().includes(name.toLowerCase())
        })
        filteredGames.length
            ? res.status(200).json(filteredGames)
            : res.status(404).send("Not Games Found")
    } else {
        res.status(200).json(allGames)
    }
})

module.exports = videogamesRouter;
