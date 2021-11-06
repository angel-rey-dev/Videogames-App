const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genresRouter = require('./genres');
const platformsRouter = require('./platforms');
const videogameRouter = require('./videogame');
const videogamesRouter = require('./videogames');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/genres", genresRouter)
router.use("/platforms", platformsRouter)
router.use("/videogame", videogameRouter)
router.use("/videogames", videogamesRouter)

module.exports = router;
