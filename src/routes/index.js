const { Router } = require('express'),
user = require('./user.route.js'),
equipo = require('./equipo.route'),
partido = require('./partido.route'),
jugada = require('./jugada.route'),
auth = require('../middlewares/userAuth')

const router = Router();

router.use('/equipo', equipo);
router.use('/partido', partido);
router.use('/jugada', jugada);
router.use('/user', user);

//router.use(auth); //Rutas que requieren token.


module.exports = router;

