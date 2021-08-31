import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css"

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navElement"><Link to='/home'><p>Home</p></Link></div>
            <div className="navElement"><Link to='/detallepais'><p>Lista de Países</p></Link></div>
            <div className="navElement"><Link to='/crearactividad'><p>Creador de Actividad</p></Link></div>
        </nav>
    )
}