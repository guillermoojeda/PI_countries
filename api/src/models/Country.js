const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('country', {
        alpha3Code: {
            type: DataTypes.STRING,
            allowNull: false,
            /* primary key = true, */ // Verificar que esto sea necesario.
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flagImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        continent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capital: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subregion: {
            type: DataTypes.STRING,
        },
        area: {
            type: DataTypes.STRING,
        },
        population: {
            type: DataTypes.STRING,
        }
    });

};
