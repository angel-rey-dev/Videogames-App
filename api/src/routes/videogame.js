const { Router } = require('express');
const videogameRouter = Router();
const { Videogame, Genre } = require('../db')
// ---- For API request  ------
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
// ----------------------------

// --> GET -->  videogame/:id
videogameRouter.get("/:id", (req, res) => {
    let id = req.params.id;
    if (typeof id !== "string") id = id.toString();

    if (id.length > 10) {
        axios.get("http://localhost:3001/videogames")
            .then(response => {
                let videogame = response.data.find(videogame => videogame.id === id)
                if (videogame) res.status(200).json(videogame)
                else res.status(404).json({ message: "Videogame not found" })
            })
            .catch(error => res.status(500).json({ message: "Internal server error", error }))
    }
    else {
        axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            .then(response => {
                const { name, background_image, genres, description, released, rating, platforms } = response.data
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
            )
            .catch(error => {
                res.status(500).json({ error: error })
            })
    }
})

// --> POST -->  videogame/
videogameRouter.post("/", (req, res) => {
    // ---> Get data from request.body
    let { name, background_image, description, released, rating, genres, platforms, createdInDb } = req.body;
    description = description.trim().charAt(0).toUpperCase() + description.trim().slice(1)
    name = name.trim().charAt(0).toUpperCase() + name.trim().slice(1)

    // ---> Create game using Videogame model
    Videogame.create({
        name,
        background_image,
        description,
        released,
        rating,
        platforms,
        createdInDb
    })
        .then(videogame => {
            // ---> Create genres using Genre model
            Genre.findAll({
                where: { name: genres }
            })
                .then(genres => {
                    videogame.addGenres(genres)
                        .then(() => {
                            res.status(201).json(videogame)
                        })
                        .catch(error => {
                            res.status(500).json({ error })
                        })
                })
                .catch(error => {
                    res.status(500).json({ error: error })
                })
        })
        .catch(error => res.status(500).json({ message: "Internal server error", error }))
})

module.exports = videogameRouter;
