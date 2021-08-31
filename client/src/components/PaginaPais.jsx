import React, { useEffect } from 'react';
import TarjetaPais from './TarjetaPais';

import { connect } from "react-redux";
import { fetchCountry } from '../actions/fetchCountry';

function PaginaPais({ country, match, fetchCountry }) {

    var alpha3Code = match.params.alpha3Code;

    useEffect(() => {
        fetchCountry(alpha3Code);
    }, [fetchCountry, alpha3Code])

    /*
Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

useEffect(() => {
async function fetchData() {
// You can await here
const response = await MyAPI.getData(someId);
// ...
}
fetchData();
}, [someId]); // Or [] if effect doesn't need props or state
*/

    console.log(country);

    return (
        <div>
            <div>Componente PaginaPais</div>
            <div>Código de tres letras: {match.params.alpha3Code}</div>
            <TarjetaPais country={country} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        country: state.country
    }
}

export default connect(mapStateToProps, { fetchCountry })(PaginaPais);