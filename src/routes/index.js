const { Router } = require('express'),
user = require('./user.route.js'),
equipo = require('./equipo.route'),
partido = require('./partido.route'),
jugada = require('./jugada.route');

const router = Router();

router.use('/user', user);
router.use('/equipo', equipo);
router.use('/partido', partido);
router.use('/jugada', jugada);

module.exports = router;

