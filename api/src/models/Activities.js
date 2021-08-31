const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.STRING,
            type: DataTypes.ENUM("1", "2", "3", "4", "5")
        },
        duration: {  // Duda: Qué debería ingresar el usuario aquí? días? horas?
            type: DataTypes.STRING,
            allowNull: false,
        },
        season: {
            type: DataTypes.STRING,
            type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring")
        }
    });
};
