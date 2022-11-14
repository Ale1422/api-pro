const {Equipo, User} = require('../db');

const nuevoEquipo = async (req, res, next) => {
    try {
        const id = req.user.id;
        const userAdmin = await User.findOne({
            where: { id },
            attributes: { exclude: ["passwordHash"] },
        });
        
        const {nombre, grupo} = req.body;
        const equipoDb = await Equipo.findOne({
            where: {nombre, grupo}
        });

        if(!equipoDb&&userAdmin.isAdmin){
            const equipoCreado = await Equipo.create({nombre,grupo});
            res.json(equipoCreado)
        }else{
            res.status(404).send("Cambio no autorizado");
        }
    } catch (error) {
        next(error);
    }
}

module.exports={
    nuevoEquipo
}