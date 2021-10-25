const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genresRouter = require('./genres');
const videogameRouter = require('./videogame');
const videogamesRouter = require('./videogames');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => res.send("Home"))
router.use("/genres", genresRouter)
router.use("/videogame", videogameRouter)
router.use("/videogames", videogamesRouter)
router.get("*", (req, res) => res.status(404).send("Error 404"))

module.exports = router;
