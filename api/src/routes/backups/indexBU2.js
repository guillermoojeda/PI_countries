const { Router } = require('express');
const { fetchAll, fetchByName, fetchByAlphaCode } = require('./actions.js');
const { db, Op, Activity, Country, RelationTable } = require("../db.js");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const actividades = require("../models/Activities.js")
// var { Activity, Country } = require('../db.js');

const router = Router();
//
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//En una primera instancia deberán traer todos los países desde 
//restcountries y guardarlos en su propia base de datos y luego 
//ya utilizarlos desde allí (Debe almacenar solo los datos 
//necesarios para la ruta principal)
//Obtener un listado de los paises.

// Llamados a restcountries.eu

//Debería usar "async" en algún lugar?


router.get('/', (req, res) => {
    fetchAll().then(
        result => {
            // console.log(result.data)
            // necesita implementarse para llenar la base de datos en esta función
            return res.send(result.data);
        }
    );

});

router.get('/countries', async (req, res) => {
    var name = req.query.name;
    if (name) {
        fetchByName(name).then(
            result => {
                console.log(result.data)
                // necesita implementarse para traer info y también las activities
                if (result.data) return res.send(result.data)
            }
        ).catch( //Esto no me gusta, pero no puedo arreglarlo de otra forma
            e => { return res.send({ message: "No se encontró país" }) }
        )
    } else {

        await Country.findAll({
            attributes: ['id', 'flagImage', 'name', 'continent', 'alpha3Code'],
            include: [{
                model: Activity,
                as: "activities"
            }]
        }).then(result => {

            if (result.length === 0) { // Llamar a la API externa únicamente si nuestra base de datos de países está vacía.
                console.log("Entro acá 1")
                fetchAll().then(
                    result => {// Llenando base de datos

                        result.data.forEach(
                            country => {
                                var { name, alpha3Code, capital, subregion, area, population } = country;
                                var flagImage = country.flag;
                                var continent = country.region;
                                var newCountry = {
                                    name,
                                    alpha3Code,
                                    flagImage,
                                    continent,
                                    subregion,
                                    capital,
                                    area,
                                    population
                                };
                                Country.create(newCountry)
                            }
                        )
                        console.log("Países fetcheados del endpoint, database filled")

                        //Desde aquí modificado por el tema de CORSvf
                        Country.findAll({
                            attributes: ['id', 'flagImage', 'name', 'continent', 'alpha3Code', 'population'],
                            include: [{
                                model: Activity,
                                as: "activities"
                            }]
                        }).then(result => {
                            console.log(result);
                            console.log("Enviando listado de paises al clientex");
                            res.status(200).send(result)
                        });

                        //Hasta aquí. Esto reemplazó el siguiente contenido:

                    }
                )
            } else {
                console.log("Entro acá 2.")
                Country.findAll({
                    attributes: ['id', 'flagImage', 'name', 'continent', 'alpha3Code', 'population'],
                    include: [{
                        model: Activity,
                        as: "activities"
                    }]
                }).then(result => {
                    console.log(result);
                    console.log(result.length);
                    console.log("Enviando listado de paises al cliente");
                    res.status(200).send(result)
                });
            }
        });

        //hasta aquí


        /*
        fetchAll().then(
            result => {// Llenando base de datos

                result.data.forEach(
                    country => {
                        var { name, alpha3Code, capital, subregion, area, population } = country;
                        var flagImage = country.flag;
                        var continent = country.region;
                        var newCountry = {
                            name,
                            alpha3Code,
                            flagImage,
                            continent,
                            subregion,
                            capital,
                            area,
                            population
                        };
                        Country.create(newCountry)
                    }
                )
                console.log("Países fetcheados del endpoint, database filled")

                //Desde aquí modificado por el tema de CORS
                Country.findAll({
                    attributes: ['id', 'flagImage', 'name', 'continent', 'alpha3Code']
                }).then(result => {
                    console.log("Enviando listado de paises al cliente");
                    res.status(200).send(result)
                });


                //Hasta aquí. Esto reemplazó el siguiente contenido:

            }
        )*/;
    }
});


router.get('/countries/:code', (req, res) => {
    var code = req.params.code;

    console.log("Entró aquí -- code: " + code)

    Country.findAll({
        where: {
            alpha3Code: code
        },
        include: [{
            model: Activity,
            as: "activities"
        }]
    }).then(result => {
        console.log(result);
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
    })


    /*
    fetchByAlphaCode(code).then(
        result => {
            console.log(result.data)
            // necesita implementarse lo que sea que haga con esto
            return res.send(result.data);
        }
    );
    */
});

/*
router.get('/countries/:name', (req, res) => {
    var name = req.params.name;
    fetchByName(name).then(
        result => {
            console.log(result.data)
            // necesita implementarse para traer también las activities
            return res.send(result.data);
        }
    );

});
*/

/* '/countries/:code'
Los campos mostrados en la ruta principal para cada país 
(imagen de la bandera, 
    nombre, 
    código de país de 3 letras y 
    continente)
Código de país de 3 letras (id)
Capital
Subregión
Área (Mostrarla en km2 o millones de km2)
Población
Actividades turísticas con toda su información asociada
*/



router.post("/activities", async (req, res) => {
    var { name, difficulty, duration, season } = req.body;
    var { countries } = req.body

    // Creando nueva actividad
    try {
        var newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });
        if (req.body.countries.length > 0) {
            // luego corregir para ver si puedo implementarlo con Promise.all(...);
            for (var i = 0; i < req.body.countries.length; i++) {
                console.log(req.body.countries[i]);
                var country = await Country.findOne({
                    where: { name: req.body.countries[i] },
                })
                console.log("country is:");
                console.log(country);
                await newActivity.addCountries(country)
            }
        } else {
            console.log("No se encontró país!")
        }

        /*
        var result = await Activity.findOne({
            where: { name: newActivity.name },
            include: country
        });*/

        console.log("newActivity is:")
        console.log(newActivity)
        res.json({ message: "Actividad creada con éxito." });
    } catch (error) {
        console.log(error)
        res.send(error);
    }






})


// Llamados a nuestra base de datos...

// Actividades

// Creando actividad

/*
router.post('/activity', async (req, res) => {
    var { name, difficulty, duration, season } = req.body;
    try {
        var activity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });
        res.json(activity);
    } catch (error) {
        res.send(error);
    }

})
*/

//var { Product, User } = require('./db.js'); // esto viene aca?


module.exports = router;
