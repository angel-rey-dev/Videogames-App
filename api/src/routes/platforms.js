const { Router } = require('express');
const platformsRouter = Router();

// ---- For API request  ------
const axios = require('axios');
require('dotenv').config();
const {
    API_KEY
} = process.env;
// ----------------------------


platformsRouter.get("/", async (req, res) => {
    try {
        const apiUrl = page => axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${page}`)
        const requests = [apiUrl(1), apiUrl(2)]
        const allPlatforms = []

        await Promise.all(requests)
            .then(responses => {
                responses.forEach(response => {
                    response.data.results.map(game => {
                        game.platforms.map(platform => {
                            if (!allPlatforms.includes(platform.platform.name)) {
                                allPlatforms.push(platform.platform.name)
                            }
                        })

                    })
                }
                )
            });
        res.status(200).json(allPlatforms)

    } catch (error) {
        res.status(404).json("Error:", error)
    }
})

module.exports = platformsRouter;