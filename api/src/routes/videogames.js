const { Router } = require('express');
const videogamesRouter = Router();
const axios = require('axios');
require('dotenv').config();
const {
    API_KEY
} = process.env;

// Traer datos de la API
const getAllGames = async () => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        const data = await response.data.results.map(game => {
            const { id, name, rating, released, platforms, short_screenshots, background_image } = game;
            return {
                id,
                name,
                released,
                rating,
                background_image,
                short_screenshots: short_screenshots.map(el => el.image),
                platforms: platforms.map(el => el.platform.name)
            }
        })
        return data
    } catch (error) {
        return error
    }
}
const getGamesFromQuerys = async (name) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?search=${name}?key=${API_KEY}`)
        const data = await response.data.results.map(game => {
            const { id, name, rating, released, platforms, short_screenshots, background_image } = game;
            return {
                id,
                name,
                released,
                rating,
                background_image,
                short_screenshots: short_screenshots.map(el => el.image),
                platforms: platforms.map(el => el.platform.name)
            }
        })
        return data
    } catch (error) {
        return error
    }
}

videogamesRouter.get('/', async (req, res) => {
    const { name } = req.query
    if (name) {
        const apiData = await getGamesFromQuerys()
        res.status(200).json(apiData)
    } else {
        const apiData = await getAllGames()
        res.status(200).json(apiData)
    }
});




module.exports = videogamesRouter;
