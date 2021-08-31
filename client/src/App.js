import './App.css';
import React from "react";

import { Route, Switch, useLocation } from "react-router-dom";

import Home from "./components/Home";
import CrearActividad from './components/CrearActividad';
import LandingPage from './components/LandingPage';
import TarjetaPais from './components/TarjetaPais';
import PaginaPais from './components/PaginaPais';
import Navbar from './components/Navbar'


//import Inicio from "./components/Inicio"; // recordar usar <Inicio/> y no Home



function App() {

    const location = useLocation();
    console.log(location);

    return (
        <div>
            <div className="App">
                <h1>Henry Countries</h1>
            </div>
            {location.pathname !== "/" &&
                <Navbar></Navbar>
            }

            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                {/*}
                <Route path="/detallepais">
                    <Home />
                </Route>
                {*/}
                {/*  
                <Route path="/pais/:idPais">
                    <TarjetaPais />
                </Route>
                */}
                {/* 1.11 */}
                <Route
                    path='/pais/:alpha3Code'
                    component={PaginaPais}
                />
                <Route path="/crearactividad">
                    <CrearActividad />
                </Route>

            </Switch>

        </div>
    );
}

export default App;
