const {User, Jugada, Partido, Op } = require('../db')

const crearJugada = async (req, res, next) => {
    try {
        const {partidoId, resultadoLocal, resultadoVisitante} = req.body;
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ["passwordHash"] },
        });
        const ahoraMasDosHoras = new Date(new Date().getTime()+(2*(60*60000)));

        const partido= await Partido.findByPk(partidoId);

        if(partido){
            const existeJugada = await Jugada.findOne({where: {partidoId, userId:user.id}});
            if(ahoraMasDosHoras<partido.fecha && !existeJugada){
                const nuevaJugada = await Jugada.create({partidoId,userId:user.id,resultadoLocal,resultadoVisitante});
                res.json(nuevaJugada);
            }else{
                res.status(404).send("Ya tiene jugada para este partido");
            }
        }else{
            res.status(404).send("No existe partido");
        }       
    } catch (error) {
        next(error)
    }
}

const jugadasUsuario = async (req,res,next) => {
    try {
        const user = await User.findByPk(req.user.id);
        if(user){
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
        const currentTime = new Date();
        const getJugadas = await Jugada.findAll({
            where:{
                check: false
            }
        })

        console.log(getJugadas)        
    } catch (error) {
        console.log(error)
    }
}

checkearJugadas()

module.exports = {
    crearJugada,
    jugadasUsuario
}