API_URL =  "https://rickandmortyapi.com/api/character";

const select = document.querySelector ("#selector");

const MostrarFormularioPorNombre = function ()  {
    const container = document.querySelector ("#form_search");
    container.innerHTML = `
    <div id =form_name>
        <label>Ingerse Nombre</label>
        <input type="text" id="name_input"> 
    </div>`;
}

const GetPersonajes = async () => {
    const request = await fetch (API_URL);
    const json_request = await request.json ();
    const personajes = await json_request.results;
    return personajes;
}

const GetEstados = async () => {
    const personajes = await GetPersonajes ();
    const status_array = personajes.map(actual => actual.status).reduce ((total , item) => {
        if (!(total.some ((t) => {return t === item})) ){
            total.push (item);
        }
        return total;
    } 
    , []);
    return (status_array);
}

const MostrarFormularioPorEstado = async () => {
    const status_array = await GetEstados ();
    const container_form = document.querySelector ("#form_search");
    container_form.innerHTML = `<select id=${"status_selector"} </select>`;
    const container_select = document.querySelector ("#status_selector");
    status_array.map ((item) => container_select.innerHTML += `<option value = ${item}> ${item} </option>`);
}

select.addEventListener ("change" , (evt) => {
    let opcion = evt.currentTarget.selectedOptions[0].value;
    if (opcion === "Busqueda_Por_Nombre"){
        MostrarFormularioPorNombre ();
    }
    else if (opcion === "Busqueda_Por_Estado") {
        MostrarFormularioPorEstado ();
    }
    else{console.log ("Funciona");}
});