const { Router } = require('express'),
user = require('./user.route.js'),
equipo = require('./equipo.route');

const router = Router();

router.use('/user', user);
router.use('/equipo', equipo);


module.exports = router;

