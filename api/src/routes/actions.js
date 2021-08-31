const axios = require("axios");

// Endpoints a utilizar según requisitos:
/*
GET https://restcountries.eu/rest/v2/all
GET https://restcountries.eu/rest/v2/name/{name}
GET https://restcountries.eu/rest/v2/alpha/{code}
*/

var fetchAll = async function (Model) {
    await axios.get('https://restcountries.eu/rest/v2/all')
        .then(resp => {
            console.log(resp.data);
            var arr = resp.data.map(
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
                    console.log(newCountry)
                    return newCountry
                }
            )
            return Model.bulkCreate(arr)

            //console.log(resp.data);
            //return resp;
        })
        .catch(e => console.log(e));
}

var fetchByName = function (name) {
    return axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(resp => {
            //console.log(resp.data);
            return resp;
        })
        .catch(e => console.log(e));
}

var fetchByAlphaCode = function (code) {
    return axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(resp => {
            //console.log(resp.data);
            return resp;
        })
        .catch(e => console.log(e));
}

// Comunicación con MI base de datos





module.exports = {
    fetchAll,
    fetchByName,
    fetchByAlphaCode
}


/*Axios example
axios.get('http://webcode.me').then(resp => {

    console.log(resp.data);
});
*/

/*
axios.get('https://restcountries.eu/rest/v2/all')
  .then((response) => {
    console.log(response);
    return response;
  }, (error) => {
    console.log(error);
  });
  */



/*

const getCountries = async function (model) {
let countryList; // En esta variable guardaremos todos los paises de la API externa.
 await axios.get("https://restcountries.eu/rest/v2/all%22)
  .then((response) => {
    countryList = response.data.map((c) => {
      return {
        idCountry: c.alpha3Code,
        name: c.translations.es ? c.translations.es : c.name,
        flag: c.flag,
        continent: c.region,
        capital: c.capital,
        subregion: c.subregion,
        area: c.area,
        population: c.population,
      };
    });
    return countryList;
  })
   .then((countryList) => {
    return model.bulkCreate(countryList); // Con la funcion bulkCreate podemos insertar lo recibido de la API sin tener que hacerlo uno por uno.
  });
}

module.exports = { getCountries };

*/