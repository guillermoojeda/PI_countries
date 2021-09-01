import React, { useEffect } from "react";
import TarjetaActividad from "./TarjetaActividad";
import "./styles/tarjetaPais.css"

export default function TarjetaPais(country) {

    country = country.country;

    console.log(country);

    return (
        <div className="card">
            <h5 className="countryTitle">Detalle de País</h5>
            <div className="row">
                <h2>{country.name}</h2>
                <img className="iconoClima" src={country.flagImage} width="150" alt="Imágen de bandera"></img>
                <p>Código de 3 letras: {country.alpha3Code}</p>
                <p>Capital: {country.capital}</p>
                <p>Continente: {country.continent}</p>
                <p>Subregion: {country.subregion}</p>
                <p>Superficie: {country.area} km^2</p>
                <p>Población: {country.population} </p>

                <h4>Actividades</h4>
                <div className="contenedorTarjetas">
                    {
                        country.activities && country.activities.length > 0
                            ?
                            country.activities.map(a => TarjetaActividad(a))
                            :
                            <p>Este país no posee actividades cargadas.</p>
                    }
                </div>

            </div>
        </div>
    )
}

/*
{breed.breed.currentPageResults.map(dog =>(
        <Dog
        name = {dog.name}
        img = {dog.img}
        temperaments = {dog.temperaments?.split(", ")}
        id = {dog.id}
        key = {dog.id}/>
*/


/*
[
    {
        "id": 11,
        "alpha3Code": "ARG",
        "name": "Argentina",
        "flagImage": "https://restcountries.eu/data/arg.svg",
        "continent": "Americas",
        "capital": "Buenos Aires",
        "subregion": "South America",
        "area": "2780400",
        "population": "43590400",
        "createdAt": "2021-08-24T12:40:10.179Z",
        "updatedAt": "2021-08-24T12:40:10.179Z",
        "activities": [
            {
                "id": 1,
                "name": "treeking",
                "difficulty": "2",
                "duration": "1 week",
                "season": "Spring",
                "createdAt": "2021-08-24T12:41:03.951Z",
                "updatedAt": "2021-08-24T12:41:03.951Z",
                "RelationTable": {
                    "createdAt": "2021-08-24T12:41:04.083Z",
                    "updatedAt": "2021-08-24T12:41:04.083Z",
                    "activityId": 1,
                    "countryId": 11
                }
            },
            {
                "id": 2,
                "name": "rafting",
                "difficulty": "3",
                "duration": "3 days",
                "season": "Spring",
                "createdAt": "2021-08-24T12:58:52.527Z",
                "updatedAt": "2021-08-24T12:58:52.527Z",
                "RelationTable": {
                    "createdAt": "2021-08-24T12:58:52.716Z",
                    "updatedAt": "2021-08-24T12:58:52.716Z",
                    "activityId": 2,
                    "countryId": 11
                }
            }
        ]
    }
]
*/





