import React, { useState } from "react";
import { connect } from "react-redux"; //Debería ser el componenteHome quien se conecta?
import { addActivity } from "../actions/addActivity.js";
import "./styles/crearActividad.css";


function CrearActividad({ addActivity }) { //Este addActivity no es el que se importa al principio del archivo, es el qeu se conecta al final del mismo!

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
    })

    const [countryInput, setCountryInput] = useState({
        newCountry: "",
    })

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    console.log(input)

    function handleCIChange(event) {
        setCountryInput({
            [event.target.name]: event.target.value
        })
    }

    console.log(countryInput)

    function handleAddCountries(event) {
        event.preventDefault();
        setInput({
            ...input,
            countries: [...input.countries, countryInput.newCountry]
        })
    }

    async function handleSubmit(event) {
        //event.preventDefault();
        addActivity(input);
        console.log("actividad enviada:")
        console.log(input);
        console.log(JSON.stringify(input));
        alert("Nueva actividad enviada al servidor:" + input.name);

        fetch("http://localhost:3001/activities", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <div className="contenedorComponente">
            <div className="contenedorForma">
                <h2 className>Creación de Nueva Actividad</h2>
                <form onSubmit={handleSubmit}>
                    <h4 className="fieldTitle">Datos de Actividad:</h4> <input
                        name="name"
                        type="text"
                        placeholder="Nombre de Actividad"
                        value={input.name}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <input
                        name="duration"
                        type="text"
                        placeholder="Duración"
                        value={input.duration}
                        onChange={handleChange}
                    />
                    <br />

                    <h4>Dificultad</h4>
                    <input name="difficulty" type="radio" value="1" onChange={handleChange} />
                    <label for="1">1</label>

                    <input name="difficulty" type="radio" value="2" onChange={handleChange} />
                    <label for="2">2</label>

                    <input name="difficulty" type="radio" value="3" onChange={handleChange} />
                    <label for="3">3</label>

                    <input name="difficulty" type="radio" value="4" onChange={handleChange} />
                    <label for="4">4</label>

                    <input name="difficulty" type="radio" value="5" onChange={handleChange} />
                    <label for="5">5</label>
                    <br />

                    <h4>Temporada</h4>
                    <input name="season" type="radio" value="Spring" onChange={handleChange} />
                    <label for="Spring">Spring</label>

                    <input name="season" type="radio" value="Summer" onChange={handleChange} />
                    <label for="Summer">Summer</label>

                    <input name="season" type="radio" value="Autumn" onChange={handleChange} />
                    <label for="Autumn">Autumn</label>

                    <input name="season" type="radio" value="Winter" onChange={handleChange} />
                    <label for="Winter">Winter</label>
                    <br />
                    <br />
                    <div >
                        <span className="fieldTitle">Agregar país para asociar a esta actividad: </span>
                        <input
                            name="newCountry"
                            type="text"
                            placeholder="país"
                            value={countryInput.countryName}
                            onChange={handleCIChange}
                        />
                        <button onClick={handleAddCountries} value="Agregar país">Agregar país</button>

                    </div>
                    <p></p>
                    {input.countries && input.countries.length > 0 ?

                        < div >
                            La actividad se agregará a los siguientes países:
                            <ul>
                                {input.countries.map(c => <li>{c}</li>)}
                            </ul>
                        </div>
                        :

                        <div> Nota: Usted no está asociando países a esta actividad.</div>
                    }
                    <br />

                    <div className="buttonContainer">
                        <input
                            type="submit"
                            className="botonForma"
                            value="Agregar actividad">
                        </input>
                    </div>
                </form>



            </div>
        </div >
    )
}

//sólo quiero despachar, no obtener nada del estado de redux, por eso despachamos una acción.
export default connect(null, { addActivity })(CrearActividad)




/*
"id": 1,
                        "name": "treeking",
                        "difficulty": "2",
                        "duration": "1 week",
                        "season": "Spring",
                        */