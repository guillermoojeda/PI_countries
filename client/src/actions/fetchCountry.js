var SET_COUNTRY = "SET_COUNTRY";

function setCountry(country) { // country será un objeto fetcheado desde el servidor
    console.log("seteando country como estado:")
    console.log(country);
    return {
        type: SET_COUNTRY,
        payload: country
    }
}

export function fetchCountry(alpha3Code = "ARG") {
    //alpha3Code deafult argumenti is = "ARG" For testing  purposes only.
    return function (dispatch) {
        fetch(`http://localhost:3001/countries/${alpha3Code}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var newCountry = data[0];
                console.log(newCountry);
                var obj = setCountry(newCountry);
                dispatch(obj);
            })
    }
}