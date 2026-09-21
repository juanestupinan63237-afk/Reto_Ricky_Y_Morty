API_URL =  "https://rickandmortyapi.com/api/character";

const select = document.querySelector ("#selector");

const GetPersonajes = async () => {
    const request = await fetch (API_URL);
    const json_request = await request.json ();
    const personajes = await json_request.results;
    return await personajes;
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
    status_array.unshift ("Cualquiera");
    const container_select = document.querySelector ("#status_selector");
    status_array.map ((item) => container_select.innerHTML += `<option value = ${item}> ${item} </option>`);
}

const GetEspecies = async () => {
    const personajes = await GetPersonajes ();
    const array_especies = personajes.map (personaje => personaje.species).reduce ((total , especie) => {
        if (!(total.includes (especie))){
            total.push (especie);
        };
        return total;
    } , []);
    return (array_especies);
}

const MostrarFormularioPorEspecie = async () => {
    const array_especies = await GetEspecies ();
    array_especies.unshift ("Cualquiera")
    const container_select = document.querySelector ("#selector_especie");
    array_especies.map ((especie) => container_select.innerHTML += `<option value = ${especie}> ${especie} </option>`);
}

MostrarFormularioPorEspecie ();
MostrarFormularioPorEstado ();

const status_selector = document.querySelector ("#status_selector");
const especie_selector = document.querySelector ("#selector_especie");

const ActualizarPersonajes = async () => {
    let personajes = await GetPersonajes ();
    const status = status_selector.value;
    const especie = especie_selector.value;
    if (status != "Cualquiera"){
        personajes = await personajes.filter ((item) => item.status == status);
        console.log (personajes);
    }
    if (especie != "Cualquiera" ){
        personajes = await personajes.filter ((item) => item.species == especie);
        console.log (personajes);
    }
}

status_selector.addEventListener ("change" , async (evt) => {
    await ActualizarPersonajes ();
})

especie_selector.addEventListener ("change" , async (evt) => {
    await ActualizarPersonajes ();
})