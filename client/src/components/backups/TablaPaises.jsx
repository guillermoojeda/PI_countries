import React, { useEffect, useState } from "react";

import FilaDeTabla from "./FilaDeTabla";

import { connect } from "react-redux";
import { fetchCountries } from "../actions/fetchCountries";
import { addActivity } from "../actions/addActivity";
import comparers from "../actions/comparers"

function TablaPaises({ countries, fetchCountries }) { //paises es un array de paises

    // min 51.00. En este componente, a penas se monte, vamos a buscar los datos de la API:
    // Uso el hook esuEffect para que se ejecute sólo la primer vez (por eso los [] del final):

    // useEffect

    useEffect(() => {
        console.log("Ejecuto useEffect desde TablaPaises. Buscando datos desde la API.")
        fetchCountries();
    }, [fetchCountries])

    // Estados React

    const [tableStatus, setTableStatus] = useState({

        currentPage: 1,
        orderedCountries: [...countries]

    })

    console.log(countries);
    console.log(tableStatus);


    const [selectedPage, setSelectedPage] = useState({
        page: 1 // Página elegida en el selector de páginas
    })

    const [displayed, setDisplayed] = useState({

        countries: tableStatus.orderedCountries.slice(0, 9),
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
            currentPage: selectedPage.page
        })
        setArrPortion(selectedPage.page)
    }

    console.log(tableStatus);
    console.log(displayed);


    // Funciones para ordenar alfabéticamente o por población (tableStatus.orderedCountries)

    function handleSortAscName() {
        var newArr = [...tableStatus.orderedCountries]
        var newArr2 = newArr.sort(comparers.byCountryAsc)
        var newArr3 = setArrPortion(1)

        setDisplayed({
            ...displayed,
            displayed: newArr2
        })
        setTableStatus({
            ...tableStatus,
            orderedCountries: newArr.sort(comparers.byCountryAsc)
        })

    }

    function handleSortDescName() {
        var newArr = [...tableStatus.orderedCountries]
        var newArr2 = newArr.sort(comparers.byCountryDesc)
        //var newArr3 = setArrPortion(1)
        setTableStatus({
            ...tableStatus,
            orderedCountries: newArr2
        })

        setDisplayed({
            ...displayed,
            countries: newArr2.slice(0, 9)
        })
    }

    function handleSortAscPop() {
        var newArr = [...tableStatus.orderedCountries]
        setTableStatus({
            ...tableStatus,
            orderedCountries: newArr.sort(comparers.byPopAsc)
        })
    }

    function handleSortDescPop() {
        var newArr = [...tableStatus.orderedCountries]
        setTableStatus({
            ...tableStatus,
            orderedCountries: newArr.sort(comparers.byPopDesc)
        })
    }






    // Funcion auxiliar para extraer la porción correspondiente de tableStatus.orderedCountries,
    // y setearlos como displayed.countries (Es decir, manejar el cambio de página).

    function setArrPortion(page = 1, arr = tableStatus.orderedCountries) {
        console.log("Página actual: " + tableStatus.currentPage);
        console.log("Página solicitada: " + page);
        console.log(typeof page);
        console.log(displayed);
        console.log("entro acá: 1")
        if (Number(page) === 1) {
            console.log("entro acá: 2")
            if (arr > 0) { // si la cantidad de paises a mostrar es mayor a cero
                console.log("entro acá: 3")
                if (arr > 9) {
                    console.log("entro acá: 4")
                    setDisplayed({
                        ...displayed,
                        countries: arr.slice(0, 9),
                    })
                } else { // si la cantidad de paises a mostrar va entre 0 y 9, mostrar todos
                    console.log("entro acá: 5")
                    setDisplayed({
                        ...displayed,
                        countries: arr
                    })
                }
            } else { // si la cantidad de paises a mostrar es cero
                console.log("entro acá: 6")
                setDisplayed({
                    ...displayed,
                    countries: false,
                })
            }
        } else {
            console.log("entro acá: 7")
            if (arr.length > (page * 10 - 1)) {
                console.log("entro acá: 8")
                setDisplayed({
                    ...displayed,
                    countries: arr.slice((page * 10 - 11), (page * 10 - 1)),
                })

            } else {
                console.log("entro acá: 9")
                setDisplayed({
                    ...displayed,
                    countries: arr.slice(page * 10 - 11),
                })
            }
        }
    }

    // Funciones para ordenar alfabéticamente -- Ya están en otro archivo.




    // Funcion para recargar datos:

    function reload() {
        setTableStatus({
            ...tableStatus,
            orderedCountries: countries
        })
        setDisplayed({
            countries: countries.slice(0, 9),
            totalPages: 26
        })
        setPages({
            numbers: arrCreator((countries.length + 1) / 10)
        })
    }

    // Funciones para cambio de orden del array de países (tableStatus.orderedCountries)

    console.log(countries)
    console.log(tableStatus.orderedCountries)
    console.log(displayed.countries)

    //Paginador

    console.log(tableStatus);
    console.log(displayed);

    return (
        <div>
            <form action="/action_page.php" onSubmit={handlePageSubmit}>
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
            <h2>Países y Continentes</h2>
            <input type="text" id="myInput" placeholder="Ingrese Nombre Pais" title="Type in a name" /> {/* onkeyup=myFuncion() */}
            <table id="myTable">
                <tbody>
                    <tr className="header">
                        <th>Bandera </th>
                        <th>País <button onClick={handleSortAscName}>A</button> <button onClick={handleSortDescName}>D</button>    </th> {/* onClick={sortTablebyCountry} */}
                        <th>Continente <button>A</button> <button>D</button>    </th> {/* onClick="sortTable" */}
                        <th>Población <button>A</button> <button>D</button>    </th> {/* onClick="sortTable(1)" */}
                    </tr>
                    {
                        displayed.countries.map(p => <FilaDeTabla //nuestro countries traído desde nuestro redux store!
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
                <p>Para reiniciar los países cargados, presione: <button onClick={reload}>Cargar datos nuevamente</button></p>
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
    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable2");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        ///Make a loop that will continue until no switching has been done:
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            // Loop through all table rows (except the first, which contains table headers):
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                // Get the two elements you want to compare,
                // one from current row and one from the next:
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                // Check if the two rows should switch place,
                // based on the direction, asc or desc:
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                // If a switch has been marked, make the switch
                // and mark that a switch has been done:
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                // If no switching has been done AND the direction is "asc",
                // set the direction to "desc" and run the while loop again.
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
    */