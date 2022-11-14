const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('equipo', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    grupo: {
      type: DataTypes.ENUM,
      values:["A","B","C","D","E","F","G","H"],
      allowNull: false
    },
    puntajeGrupo: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
};