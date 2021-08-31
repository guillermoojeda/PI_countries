import React from "react";
import CrearActividad from "./CrearActividad"
import TarjeteroPaises from "./TarjeteroPaises"
import TablaPaises from "./TablaPaises";

import { Link } from "react-router-dom";

export default function Inicio() {



    return (
        <div>
            <Link to="/home"></Link>
            <TablaPaises></TablaPaises>

            {/*}
            <TarjeteroPaises />
            <CrearActividad />
            {*/}

        </div>
    )
}

/*
Ruta principal (Home)
Ruta de detalle de país
Ruta de creación de actividad
*/