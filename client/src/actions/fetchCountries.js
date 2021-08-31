import axios from "../../../api/node_modules/axios";

var ADD_COUNTRIES = "ADD_COUNTRIES";

export function fetchCountries() {
    return function (dispatch) {
        axios.get("http://localhost:3001/countries")
            //.then(response => response.json())
            .then(data => {
                dispatch({ type: ADD_COUNTRIES, payload: data.data })
            })
    }
}

