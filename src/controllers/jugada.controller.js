const {User, Jugada, Partido } = require('../db')

const crearJugada = async (req, res, next) => {
    try {
        const {partidoId, resultadoLocal, resultadoVisitante} = req.body;
        const userId = req.user.id;
        const user = await User.findOne({
            where: { id },
            attributes: { exclude: ["passwordHash"] },
        });

        const existeJugada = await Jugada.findOne({where: {partidoId, userId}});
        
        const ahoraMasDosHoras = new Date(new Date().getTime()+(2*(60*60000)));
        
        if(ahoraMasDosHoras<partido.fecha && !existeJugada){
            const nuevaJugada = await Jugada.create({partidoId,userId,resultadoLocal,resultadoVisitante});
            res.json(nuevaJugada);
        }else{
            res.status(404).send("Jugada invalida");
        }
    } catch (error) {
        next(e)
    }
}

module.exports = {
    crearJugada
}