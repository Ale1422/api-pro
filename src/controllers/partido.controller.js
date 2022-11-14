const {User, Partido} = require('../db');

const nuevoPartido = async (req, res, next) => {
    try {
        const id = req.user.id;
        const isAdmin = await User.findOne({
            where: { id },
            attributes: { exclude: ["passwordHash"] },
        }).isAdmin;

        const {localId, visitanteId, fecha, fase} = req.body;
        const partidoDb = await Partido.findOne({
            where: {localId,visitanteId,fase}
        });

        if(!partidoDb && isAdmin){
            const partidoNuevo = await Partido.create({localId,visitanteId,fecha,fase})
            res.json(partidoNuevo) 
        }else{
            res.status(404).send("Partido existente");
        }
    } catch (error) {
        next(error)
    }

}

const actualizarPartido = async (req, res, next) => {
    try {
        const idUser = req.user.id;
        const isAdmin = await User.findOne({
            where: { id: idUser },
            attributes: { exclude: ["passwordHash"] },
        }).isAdmin;
        
        const {
          id,
          resultadoLocal,
          resultadoVisitante,
          resultado,
        } = req.body;
        const partidoActualizar = await Partido.findOne({
            where: {id}
        });
        
        if(partidoActualizar && isAdmin){
            partidoActualizar.resultadoLocal = resultadoLocal;
            partidoActualizar.resultadoVisitante = resultadoVisitante;
            partidoActualizar.resultado = resultado;
            await partidoActualizar.save();
            res.json(partidoActualizar);
        }else{
            res.status(404).send("No autorizado");
        }
    } catch (error) {
        next(error)
    }

}

module.exports={
    nuevoPartido,
    actualizarPartido
}