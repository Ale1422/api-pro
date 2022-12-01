const {Router} = require('express'),
joi = require('joi'),
validator = require('express-joi-validation').createValidator({}),
{crearJugada, jugadasUsuario, checkearJugadas} = require('../controllers/jugada.controller'),
userAuth = require('../middlewares/userAuth');

const router = Router();

const jugadaModelo = joi.object({
    partidoId: joi.number().integer().required(),
    resultadoLocal: joi.number().integer().required(),
    resultadoVisitante: joi.number().integer().required()
});

router.post('/nueva', userAuth, validator.body(jugadaModelo), crearJugada);
router.get('/jugadasusuario', userAuth, jugadasUsuario);
router.post('/check', userAuth, checkearJugadas);

module.exports = router