const {User, Partido, Equipo} = require('../db');

const nuevoPartido = async (req, res, next) => {
    try {
        if(req.user.isAdmin){
            const {localId, visitanteId, fecha, fase} = req.body;
            const partidoDb = await Partido.findOne({
                where: {fase,localId, visitanteId}
            });
    
            if(!partidoDb){
                const partidoNuevo = await Partido.create({localId,visitanteId,fecha,fase})
                res.json(partidoNuevo) 
            }else{
                res.status(404).send("Partido existente");
            }
        }
    } catch (error) {
        next(error)
    }

}

const actualizarPartido = async (req, res, next) => {
    try {
        if (req.user.isAdmin) {
          const { id, resultadoLocal, resultadoVisitante, resultado, fecha } =
            req.body;
          const partidoActualizar = await Partido.findByPk(id);

          if (partidoActualizar) {
            partidoActualizar.resultadoLocal = resultadoLocal;
            partidoActualizar.resultadoVisitante = resultadoVisitante;
            partidoActualizar.resultado = resultado;
            partidoActualizar.fecha = fecha;
            partidoActualizar.checkFlag = true;
            await partidoActualizar.save();
            res.json(partidoActualizar);
          } else res.status(404).send("No existe partido");
        } else res.status(404).send("No autorizado");       
    } catch (error) {
        next(error)
    }

}

const getAll  = async (req, res, next ) =>{
    try {
        const partidosDB = await Partido.findAll({
          include: [
          {
            model: Equipo,
            as: "equipoLocal"
          },
          {
            model: Equipo,
            as: "equipoVisitante"
          }
        ]
        });

        res.send(partidosDB);
      } catch (error) {
        next(error)
      }
}

module.exports={
    nuevoPartido,
    actualizarPartido,
    getAll
}