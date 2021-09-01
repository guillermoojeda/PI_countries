import React, { useEffect, useState, } from "react";

import FilaDeTabla from "./FilaDeTabla";

import { connect, useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../actions/fetchCountries";
import { addActivity } from "../actions/addActivity";
import comparers from "../actions/comparers";

import "./styles/tablaPaises.css";

function TablaPaises({ countries, fetchCountries }) { //paises es un array de paises

    // min 51.00. En este componente, a penas se monte, vamos a buscar los datos de la API:
    // Uso el hook esuEffect para que se ejecute sólo la primer vez (por eso los [] del final):

    // useEffect

    //const dispatch = useDispatch();
    const [tableStatus, setTableStatus] = useState({

        currentPage: 1,
        orderedCountries: [...countries],
        displayedCountries: [...countries].slice(0, 9),
        filterValue: "",
        continentValue: "",
        activityValue: "",


    })


    useEffect(() => {
        console.log("Ejecuto useEffect desde TablaPaises. Buscando datos desde la API.")
        fetchCountries();
    }, [fetchCountries])


    useEffect(() => {
        console.log("Ejecuto segundo useEffect desde TablaPaises.")
        setTableStatus({
            ...tableStatus,
            orderedCountries: countries,
            displayedCountries: countries.slice(0, 9),
        });
    }, [countries])


    //const paises = useSelector(state => state.countries)

    // Estados React

    console.log(countries);
    console.log(tableStatus);


    const [selectedPage, setSelectedPage] = useState({
        page: 1 // Página elegida en el selector de páginas
    })

    const [displayed, setDisplayed] = useState({


        totalPages: ((tableStatus.orderedCountries.length) - 9) / 10 + 1

    })

    console.log(displayed);

    function arrCreator(pagesNumber) { // Función creadora de array con números de página.
        var arr = [];
        for (let i = 0; i < pagesNumber; i++) {
            arr.push(i + 1);
        }
        return arr;
    }

    const [pages, setPages] = useState({
        numbers: arrCreator(displayed.totalPages)
    })



    // funciones para cambios de paginación (tableStatus.currentPage)

    console.log(tableStatus);
    console.log(displayed);

    function handlePageChange(event) {
        console.log("Página seleccionada: " + event.target.value)
        setSelectedPage({
            page: event.target.value
        })
    }


    function handlePageSubmit(event) {
        event.preventDefault();
        console.log("ejecutando handlePageSubmit");
        console.log("Página a setear en status es: " + selectedPage.page)
        setTableStatus({
            ...tableStatus,
            currentPage: selectedPage.page,
            filterValue: ""
        })
        setArrPortion(selectedPage.page)
    }

    console.log(tableStatus);
    console.log(displayed);


    // Funciones para ordenar alfabéticamente o por población (tableStatus.orderedCountries)

    function handleSortAscName() {
        var newArr = [...tableStatus.orderedCountries]
        var newArr2 = newArr.sort(comparers.byCountryAsc)

        setTableStatus({
            ...tableStatus,
            orderedCountries: newArr2,
            displayedCountries: newArr2.slice(0, 9),
            currentPage: 1,
            filterValue: ""
        })
    }

    function handleSortDescName() {
        var newArr = [...tableStatus.orderedCountries]
        var newArr2 = newArr.sort(comparers.byCountryDesc)

        setTableStatus({
            ...tableStatus,
            orderedCountries: newArr2,
            displayedCountries: newArr2.slice(0, 9),
            currentPage: 1,
            filterValue: ""
        })
    }

    function handleSortAscPop() {
        var newArr = [...tableStatus.orderedCountries]
        var newArr2 = newArr.sort(comparers.byPopAsc)

        setTableStatus({
            ...tableStatus,
            orderedCountries: newArr2,
            displayedCountries: newArr2.slice(0, 9),
            currentPage: 1,
            filterValue: ""
        })
    }

    function handleSortDescPop() {
        var newArr = [...tableStatus.orderedCountries]
        var newArr2 = newArr.sort(comparers.byPopDesc)

        setTableStatus({
            ...tableStatus,
            orderedCountries: newArr2,
            displayedCountries: newArr2.slice(0, 9),
            currentPage: 1,
            filterValue: ""
        })
    }


    // Función para manejar el filtro de nombre de país

    function handleFilterChange(event) {

        var arr1 = tableStatus.orderedCountries;
        var str = event.target.value;
        var arr2 = arr1.filter(e => {
            var s1 = e.name.toLowerCase();
            var s2 = str.toLowerCase();
            return (s1.includes(s2))
        });
        if (arr2 && arr2.length > 9) var arr3 = arr2.slice(0, 9);
        else if (arr2) var arr3 = arr2;
        setTableStatus({
            ...tableStatus,
            //orderedCountries: arr2,
            displayedCountries: arr3,
            [event.target.name]: event.target.value
        })
    }

    // Función para filtrar según posean o no la actividad

    function handleActivitySubmit(event) {
        event.preventDefault();
        var activity = tableStatus.activityValue;
        var arr1 = [...tableStatus.orderedCountries];
        console.log("handleActivitySubmit comienza");
        console.log(arr1);
        var arr2 = arr1.filter(c => {
            console.log("c.activities:");
            console.log(c.activities);
            if (!c.activities) return false;
            if (c.activities) {
                for (var act of c.activities) {
                    if (act.name.toLowerCase() === activity.toLowerCase()) return true;
                }
            }
            return false;
        })
        console.log(arr2);
        setTableStatus({
            ...tableStatus,
            //orderedCountries: arr2,
            displayedCountries: arr2,
            filterValue: "",
            activityValue: ""
        })
    }

    function handleActivityChange(event) {

        setTableStatus({
            ...tableStatus,
            [event.target.name]: event.target.value
        })
    }

    function handleContinentChange(event) {

        var arr1 = tableStatus.orderedCountries;
        var str = event.target.value;
        var arr2 = arr1.filter(e => {
            var s1 = e.continent.toLowerCase();
            var s2 = str.toLowerCase();
            return (s1.includes(s2))
        });
        if (arr2 && arr2.length > 9) var arr3 = arr2.slice(0, 9);
        else if (arr2) var arr3 = arr2;
        setTableStatus({
            ...tableStatus,
            //orderedCountries: arr2,
            displayedCountries: arr3,
            [event.target.name]: event.target.value
        })
    }





    // Funcion auxiliar para extraer la porción correspondiente de tableStatus.orderedCountries,
    // y setearlos como tableStatus.displayedCountries (Es decir, manejar el cambio de página).

    function setArrPortion(page = 1, arr = tableStatus.orderedCountries) {
        console.log("Página actual: " + tableStatus.currentPage);
        console.log("Página solicitada: " + page);
        console.log(displayed);
        console.log("entro acá: 1")
        if (Number(page) === 1) {
            console.log("entro acá: 2")
            if (arr.length > 0) { // si la cantidad de paises a mostrar es mayor a cero
                console.log("entro acá: 3")
                if (arr.length > 9) {
                    console.log("entro acá: 4")
                    setTableStatus({
                        ...tableStatus,
                        currentPage: Number(page),
                        displayedCountries: arr.slice(0, 9),
                        filterValue: ""
                    })
                } else { // si la cantidad de paises a mostrar va entre 0 y 9, mostrar todos
                    console.log("entro acá: 5")
                    setTableStatus({
                        ...tableStatus,
                        currentPage: Number(page),
                        displayedCountries: arr,
                        filterValue: ""
                    })
                }
            } else { // si la cantidad de paises a mostrar es cero
                console.log("entro acá: 6")
                setTableStatus({
                    ...tableStatus,
                    currentPage: Number(page),
                    displayedCountries: [],
                    filterValue: ""
                })
            }
        } else {
            console.log("entro acá: 7")
            if (arr.length > (page * 10 - 1)) {
                console.log("entro acá: 8")
                setTableStatus({
                    ...tableStatus,
                    currentPage: Number(page),
                    displayedCountries: arr.slice((page * 10 - 11), (page * 10 - 1)),
                    filterValue: ""
                })

            } else {
                console.log("entro acá: 9")
                setTableStatus({
                    ...tableStatus,
                    currentPage: Number(page),
                    displayedCountries: arr.slice(page * 10 - 11),
                    filterValue: ""
                })
            }
        }
    }

    // Funciones para ordenar alfabéticamente -- Ya están en otro archivo.




    // Funcion para recargar datos:

    function reload() {
        setTableStatus({
            ...tableStatus,
            orderedCountries: countries,
            displayedCountries: countries.slice(0, 9),
        })

        setDisplayed({
            totalPages: 26
        })

        setPages({
            numbers: arrCreator((countries.length + 1) / 10)
        })
    }

    // Funciones para cambio de orden del array de países (tableStatus.orderedCountries)

    console.log(countries)
    console.log(tableStatus.orderedCountries)
    console.log(tableStatus.displayedCountries)



    //Paginador

    console.log(tableStatus);
    console.log(displayed);

    return (
        <div className="contenedorTabla">
            <h2>Países y Continentes</h2>


            <p>Ingrese nombre de país para filtrar:
                <form>
                    <input
                        name="filterValue"
                        value={tableStatus.filterValue}
                        onChange={handleFilterChange}
                        type="text"
                        placeholder="Ingrese Nombre Pais"
                        title="Búsqueda de país"
                    />

                </form>
            </p>

            <p>Ingrese nombre de continente para filtrar:
                <form>
                    <input
                        name="continentValue"
                        value={tableStatus.continentValue}
                        onChange={handleContinentChange}
                        type="text"
                        placeholder="Ingrese Nombre Continente"
                        title="Búsqueda de Continente"
                    />

                </form>
            </p>

            <p>Ingrese nombre de actividad para filtrar:
                <form onSubmit={handleActivitySubmit}>
                    <input
                        name="activityValue"
                        value={tableStatus.activityValue}
                        onChange={handleActivityChange}
                        type="text"
                        placeholder="Ingrese Nombre actividad"
                        title="Filtro de acitividad"
                    />
                    <input type="submit" value="Filtrar según actividad"></input>

                </form>
            </p>

            <form action="/action_page.php" onSubmit={handlePageSubmit} className="paginator">
                <label for="pageSelector">Ir a la página:</label>
                <select id="pageSelector" name="pageSelector" onChange={handlePageChange}>
                    {
                        pages.numbers.map(num => {
                            return <option value={num.toString()}>{num}</option>
                        })
                    }
                </select>
                <input type="submit" value="Go to page" />
            </form>

            <table id="myTable">
                <tbody>
                    <tr className="header">
                        <th>Bandera </th>
                        <th>País <button onClick={handleSortAscName}>A</button> <button onClick={handleSortDescName}>D</button>    </th> {/* onClick={sortTablebyCountry} */}
                        <th>Continente </th>
                        <th>Población <button onClick={handleSortAscPop}>A</button> <button onClick={handleSortDescPop}>D</button>    </th> {/* onClick="sortTable(1)" */}
                    </tr>
                    {
                        tableStatus.displayedCountries.map(p => <FilaDeTabla //nuestro countries traído desde nuestro redux store!
                            key={p.id}
                            id={p.id}
                            flagImage={p.flagImage}
                            name={p.name}
                            continent={p.continent}
                            alpha3Code={p.alpha3Code}
                            population={p.population}
                        />)
                    }

                </tbody>
            </table>
            <div>
                <p>Para cargar o reiniciar los países presione: <button onClick={reload}>Cargar datos nuevamente.</button></p>
            </div>

        </div>
    )


}

const mapStateToProps = (state) => { //min 49.20
    return {
        countries: state.countries
    } // Devuelve un objeto con la prop "countries" cuyo valor es el array "countries" del estado redux.
    // Ahora, implícitamente, se pasa como argumento "countries", que hace referencia al "countries" del store redux.
    // Por lo tanto, en este componente se mapea "countries".
}

export default connect(mapStateToProps, { fetchCountries })(TablaPaises);



/*
Ahi lo estuve mirando aunque no al 100% porque estoy con otras cosas, pero no esta mal el segundo useEffect,
lo que ocurre es que vos cuando haces el dispatch lo que se carga es el countries no el displayCountries, y
vos estas haciendo el map sobre ese displayCountries. Entonces aunque te llegan como prop al componente no
se están cargando en el estado sin el segundo useEffect. Asi que no estaría mal, quizas podrías hacerlo más
prolijo haciendo la logica directo en el reducer y que por prop le llegue ya directo solo los paises que
tiene que mostrar
*/
