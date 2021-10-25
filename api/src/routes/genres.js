const { Router } = require('express');
const genresRouter = Router();

// ---- For API request  ------
const axios = require('axios');
require('dotenv').config();
const {
    API_KEY
} = process.env;
// ----------------------------

const { Videogame, Genre } = require('../db')

// Get genres from API and save into DataBase 
genresRouter.get("/", async (req, res) => {
    try {
        const genresApiResponse = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genresApiData = await genresApiResponse.data.results.map(genre => genre.name)
        genresApiData.forEach(genre => {
            Genre.findOrCreate({
                where: { name: genre }
            })
        })
        const allGeneres = await Genre.findAll()
        res.status(200).json(allGeneres)
    } catch (error) {
        res.status(404).json("Error:", error)
    }
})

module.exports = genresRouter;
