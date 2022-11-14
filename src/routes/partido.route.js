const {Router} = require('express'),
joi = require('joi'),
validator = require('express-joi-validation').createValidator({}),
{nuevoPartido, actualizarPartido} = require('../controllers/partido.controller'),
userAuth = require('../middlewares/userAuth');

const router = Router();

const partidoModelo = joi.object({
    localId: joi.number().integer().required(),
    visitanteId: joi.number().integer().required(),
    fecha: joi.date().required(),
    fase: joi.string().required()
});

const putModelo = joi.object({
    id: joi.number().integer().required(),
    resultadoLocal: joi.number().integer().required(),
    resultadoVisitante: joi.number().integer().required(),
    resultado: joi.string().regex(/^[a-zA-Z\s]+$/).required()
});

router.post('/nuevo', userAuth, validator.body(partidoModelo), nuevoPartido);
router.put('/actualizar',userAuth, validator.body(putModelo), actualizarPartido);

module.exports = router