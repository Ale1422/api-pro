const { Router } = require('express'),
router = Router(),
joi = require('joi'),
validator = require('express-joi-validation').createValidator({}),
{ nuevoEquipo } = require('../controllers/equipo.controller'),
validate = require('../middlewares/validate');

const partidoModelo = joi.object({
    nombre: joi.string().regex(/^[a-zA-Z\s]+$/).required(),
    grupo: joi.string().regex(/^[a-zA-Z\s]+$/).min(1).max(1).required()
});

router.post('/nuevo', validate, validator.body(partidoModelo), nuevoEquipo);

module.exports = router;