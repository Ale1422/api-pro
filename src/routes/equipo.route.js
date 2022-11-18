const { Router } = require('express'),
router = Router(),
joi = require('joi'),
validator = require('express-joi-validation').createValidator({}),
{ nuevoEquipo } = require('../controllers/equipo.controller'),
userAuth = require('../middlewares/userAuth');

const equipoModelo = joi.object({
    nombre: joi.string().regex(/^[a-zA-ZñÑ\s]+$/).required(),
    grupo: joi.string().regex(/^[a-zA-Z\s]+$/).min(1).max(1).required()
});

router.post('/nuevo', userAuth, validator.body(equipoModelo), nuevoEquipo);

module.exports = router;