import React, { useEffect } from 'react';
import TarjetaPais from './TarjetaPais';

import { connect } from "react-redux";
import { fetchCountry } from '../actions/fetchCountry';

function ResultadoPais({ country, match, fetchCountry }) {

    var name = match.params.name;

    useEffect(() => {
        fetchCountry(name);
    }, [fetchCountry, name])


    console.log(country);

    return (
        <div className="contenedorDeConsultaPais">
            {
                country.name ?
                    <TarjetaPais country={country} /> :
                    <p>No se encontróe el país solicitado</p>

            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        country: state.country
    }
}

export default connect(mapStateToProps, { fetchCountry })(ResultadoPais);