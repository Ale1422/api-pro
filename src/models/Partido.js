const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('partido', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    localId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    visitanteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    resultadoLocal: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    },
    resultadoVisitante: {
        type: DataTypes.SMALLINT,
        defaultValue: 0
      },
    resultado:{
      type: DataTypes.ENUM,
      values: ["Local", "Visitante", "Empate"]
    },   
    fase: {
      type: DataTypes.ENUM,
      values:["Grupo", "Octavos", "Cuartos", "Semi", "Final"],
      allowNull: false
    }
  });
};