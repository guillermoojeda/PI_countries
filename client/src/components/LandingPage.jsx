import React from "react";
import "./styles/landingPage.css";

import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="LandingPage">

            <div className="text1">
                <Link to="/home" classname="button">Ir a Home</Link>
            </div>

        </div>
    )
}
