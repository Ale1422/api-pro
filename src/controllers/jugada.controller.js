const {User, Jugada, Partido, Op } = require('../db')

const crearJugada = async (req, res, next) => {
    try {
        if (req.user) {
          const { partidoId, resultadoLocal, resultadoVisitante } = req.body;
          const ahoraMasDosHoras = new Date(
            new Date().getTime() + 2 * (60 * 60000)
          );

          const partido = await Partido.findByPk(partidoId);

          if (partido) {
            const existeJugada = await Jugada.findOne({
              where: { partidoId, userId: user.id },
            });
            if (ahoraMasDosHoras < partido.fecha && !existeJugada) {
              const nuevaJugada = await Jugada.create({
                partidoId,
                userId: req.user.id,
                resultadoLocal,
                resultadoVisitante,
              });
              res.json(nuevaJugada);
            } else {
              res.status(404).send("Ya tiene jugada para este partido");
            }
          } else res.status(404).send("No existe partido");
        } else res.status(404).send("Usuario debe loguearse");          
    } catch (error) {
        next(error)
    }
}

const jugadasUsuario = async (req,res,next) => {
    try {
        if(req.user){
            const jugadas = await Jugada.findAll({
                where: {userId: user.id}
            })
            res.send(jugadas);
        }else{
            res.status(404).send("Usuario invalido");
        }
    } catch (error) {
      next(error)  
    }
}

const checkearJugadas = async (req, res, next) => {
    try {
        if(req.user.isAdmin){
            const getJugadas = await Jugada.findAll({
                where:{
                    check: false
                },
                include:{
                    model: Partido,
                    as: "partido",
                    where:{checkFlag: true}
                }
            })
    
            if(getJugadas){
                for (const item of getJugadas) {
                    let puntaje;
    
                    switch(item.partido.resultado){
                        case "Local":
                            if(item.resultadoLocal === item.partido.resultadoLocal && item.resultadoVisitante === item.partido.resultadoVisitante) puntaje = 5;    
                            else if(item.resultadoLocal > item.resultadoVisitante) puntaje = 3;
                            else puntaje = 0
                            break;
                        case "Visitante":
                            if(item.resultadoLocal === item.partido.resultadoLocal && item.resultadoVisitante === item.partido.resultadoVisitante) puntaje = 5;    
                            else if(item.resultadoLocal < item.resultadoVisitante) puntaje = 3;
                            else puntaje = 0
                            break;
                        case "Empate":
                            if(item.resultadoLocal === item.partido.resultadoLocal && item.resultadoVisitante === item.partido.resultadoVisitante) puntaje = 5;    
                            else if(item.resultadoLocal === item.resultadoVisitante) puntaje = 3;
                            else puntaje = 0
                            break;
                        default:
                            break;
                    }
    
                    const jugador = await User.findByPk(item.userId);
                    jugador.puntaje += puntaje;
                    await jugador.save();
                    item.check = true                
                    await item.save()
                }
                res.send("Jugadas Chequeadas")            
            } else res.status(404).send("Usuario no habilitado");      
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    crearJugada,
    jugadasUsuario,
    checkearJugadas
}