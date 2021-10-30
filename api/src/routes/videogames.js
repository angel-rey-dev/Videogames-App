const { Router } = require('express');
const videogamesRouter = Router();
const { Videogame, Genre } = require('../db')

// ---- For API request  ------
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
// ----------------------------

// const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
// let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)

// Get data form API
const getApiData = async () => {
    const apiUrl = page => axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${page}`)
    const requests = [apiUrl(1), apiUrl(2), apiUrl(3)]
    const games = []
    await Promise.all(requests)
        .then(responses => {
            responses.forEach(response => games.push(
                response.data.results.map(game => {
                    const { name, background_image, genres, id,rating } = game;
                    return {
                        id,
                        name,
                        background_image,
                        rating,
                        genres: genres.map(el => el.name)
                    }
                })
            ))
        });
    return games.flat()
}

// Get data from DataBase
const getDbData = async () => {
    try {
        const dbInfo = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
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
        // res.status(200).json(allGames)
        res.status(200).json(allGames)
    }
})

module.exports = videogamesRouter;
