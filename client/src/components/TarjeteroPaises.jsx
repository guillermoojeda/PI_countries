import React from "react";

import TarjetaPais from "./TarjetaPais";

export default function TarjeteroPaises() {
    const array = [{
        "id": 11,
        "alpha3Code": "ARG",
        "name": "Argentina",
        "flagImage": "https://restcountries.eu/data/arg.svg",
        "continent": "Americas",
        "capital": "Buenos Aires",
        "subregion": "South America",
        "area": "2780400",
        "population": "43590400"
    },
    {
        "id": 13,
        "alpha3Code": "BRA",
        "name": "Brazil",
        "flagImage": "https://restcountries.eu/data/arg.svg",
        "continent": "Americas",
        "capital": "Buenos Aires",
        "subregion": "South America",
        "area": "2780400",
        "population": "43590400"
    }]
    return (
        <div>
            {/*
                array.map(p => <TarjetaPais
                    key={p.alpha3Code}
                    id={p.id}
                    alpha3code={p.alpha3Code}
                    name={p.name}
                    flagImage={p.flagImage}
                    continent={p.continent}
                    capital={p.capital}
                    subregion={p.subregion}
                    area={p.area}
                    population={p.population}
                    activities={p.activities}
                />)
                */}
        </div>
    )
}