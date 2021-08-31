import React from "react";
import { Link } from "react-router-dom";

export default function FilaDeTabla({ flagImage, name, continent, alpha3Code, population }) {
    return (
        <tr>
            <td><img src={flagImage} alt="Imagen de bandera" height="20"></img></td>
            <td>
                {alpha3Code ? (<Link to={`/pais/${alpha3Code}`} >{name}</Link>) : <p>{name}</p>}
            </td>
            <td>{continent}</td>
            <td>{population}</td>
        </tr>
    )

}

