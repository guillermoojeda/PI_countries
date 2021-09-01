import React, { useEffect } from 'react';
import TarjetaPais from './TarjetaPais';

import { connect } from "react-redux";
import { fetchCountry } from '../actions/fetchCountry';

function PaginaPais({ country, match, fetchCountry }) {

    var alpha3Code = match.params.alpha3Code;

    useEffect(() => {
        fetchCountry(alpha3Code);
    }, [fetchCountry, alpha3Code])

    console.log(country);

    return (
        <div className="contenedorDePaginaPais">
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