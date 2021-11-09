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

// Get all genres from API and save into DataBase 

genresRouter.get("/", (req, res) => {
    axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        .then(response => {
            const genresApiData = response.data.results.map(genre => genre.name)
            genresApiData.forEach(genre => {
                Genre.findOrCreate({
                    where: { name: genre }
                })
            })
            return Genre.findAll()
        })
        .then(genres => {
            res.status(200).json(genres)
        })
        .catch(error => {
            res.status(404).json(error)
        })
})

module.exports = genresRouter;
