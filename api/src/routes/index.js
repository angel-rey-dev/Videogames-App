const { Router } = require('express');

const axios = require('axios');
require('dotenv').config();
const {
    API_KEY
} = process.env;

const { Videogame, Genre } = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genresRouter = require('./genres');
const videogameRouter = require('./videogame');
const videogamesRouter = require('./videogames');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => res.send("Home"))
// router.use("/genres", genresRouter)
router.use("/videogame", videogameRouter)
// router.use("/videogames", videogamesRouter)
// router.get("*", (req, res) => res.send("404"))


// Traer datos de la API
const getApiInfo = async () => {
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
// Traer datos de la DB
const getDbInfo = async () => {
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

// Unir los datos de la API y de la DB
const getAllGames = async () => {
    try {
        const apiInfo = await getApiInfo()
        const dbInfo = await getDbInfo()
        return apiInfo.concat(dbInfo)
    } catch (error) {
        return error
    }
}

router.get("/videogames", async (req, res) => {
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

router.get("/genres", async (req, res) => {
    const genresApiResponse = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genresApiData = await genresApiResponse.data.results.map(genre => genre.name)
    genresApiData.forEach(genre => {
        Genre.findOrCreate({
            where: { name: genre }
        })
    })
    const allGeneres = await Genre.findAll()
    res.status(200).json(allGeneres)
})

module.exports = router;
