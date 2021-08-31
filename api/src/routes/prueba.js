const axios = require('axios');

// Usar el archivo fetchOne únicamente para probar la coniexión a la API...

/* This works ok
var fetchOne = function () {
    axios.get('https://restcountries.eu/rest/v2/name/argentina')
        .then(resp => {
            console.log(resp.data);
        });
}

fetchOne();

*/

/* This also works OK! */

var fetchOne = function () {
    return axios.get('https://restcountries.eu/rest/v2/name/argentina')
        .then(resp => {
            //console.log(resp.data);
            return resp;
        });
}

fetchOne().then(
    result => console.log(result.data)
)

