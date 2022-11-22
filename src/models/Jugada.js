const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('jugada', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    partidoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
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
    puntaje: {
        type: DataTypes.SMALLINT,
        defaultValue: 0
    },
    check:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};