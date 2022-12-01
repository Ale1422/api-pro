const {Equipo, User} = require('../db');

const nuevoEquipo = async (req, res, next) => {
    try {
        if(req.user.isAdmin){
            const {nombre, grupo} = req.body;
            const equipoDb = await Equipo.findOne({
                where: {nombre, grupo}
            });
    
            if(!equipoDb){
                const equipoCreado = await Equipo.create({nombre,grupo});
                res.json(equipoCreado)
            }else res.status(404).send("Ya existe el equipo");
        }else res.status(404).send("Cambio no autorizado");        
    } catch (error) {
        next(error);
    }
}

module.exports={
    nuevoEquipo
}